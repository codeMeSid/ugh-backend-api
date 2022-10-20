git pull
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image  $(docker image ls -q)
docker build -t siddy/ugh-api:latest .
docker run -d -p 4000:4000 siddy/ugh-api:latest