# RUN SERVER NORMALLY WITHOUT DOCKER
npm run dev

# Docker Commands

# Build the image

docker build -t backend-kepegawaian .

# Run the container on port 3000

docker run -p 3000:3000 backend-kepegawaian

# Run in background

docker run -d -p 3000:3000 backend-kepegawaian

# Execute migrations inside container

docker exec -it <container_id> bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# View logs

docker logs <container_id>


