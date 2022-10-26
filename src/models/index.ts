import mongoose from "mongoose";

export class ModelCreator {
  private name: string = "";
  constructor(schemaName: string) {
    this.name = schemaName;
  }
  create<A, D>(
    blueprint: mongoose.SchemaDefinition<mongoose.SchemaDefinitionType<D>>,
    preBuildAttrsTransfor?: (attrs: A) => Object
  ) {
    type ATTRS = A;
    type DOC = D & mongoose.Document;
    interface MOD extends mongoose.Model<DOC> {
      build(attrs: ATTRS): DOC;
    }
    const schema = new mongoose.Schema<DOC, MOD>(blueprint, {
      toJSON: {
        transform(doc, ret, options) {
          ret.id = ret._id;
          delete ret._id;
          delete ret._v;
        },
      },
    });
    schema.statics.build = (attrs: any) => {
      if (preBuildAttrsTransfor) attrs = preBuildAttrsTransfor(attrs);
      return new model(attrs);
    };
    const model = mongoose.model<DOC, MOD>(this.name, schema);
    return model;
  }
}
