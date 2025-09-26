FROM node:18-alpine

WORKDIR /app

# First, just copy and check package.json
COPY package.json ./

# Validate the package.json file
RUN node -e "try { require('./package.json'); console.log('✅ package.json is valid') } catch(e) { console.error('❌ JSON Error:', e.message); process.exit(1) }"

# Then install dependencies
RUN npm install

COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]
