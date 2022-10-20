git pull
docker container stop $(docker container ls -a -q)
docker container rm $(docker container ls -a -q)
docker image rm  $(docker image ls -a -q)
docker build -t siddy/ugh-api:latest .
docker run -d -p 4000:4000 siddy/ugh-api:latest