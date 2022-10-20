git pull
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image  $(docker image ls -a -q)
docker build -t siddy/ugh-api:latest .
docket run -d -p 4000:4000 siddy/ugh-api:latest