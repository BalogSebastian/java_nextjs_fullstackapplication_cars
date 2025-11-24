# 1. Node.js környezet (Frissítettük 22-re!)
FROM node:22-alpine

# 2. Munkakönyvtár beállítása a konténeren belül
WORKDIR /app

# 3. Bemásoljuk a csomaglistákat
COPY package*.json ./

# 4. Telepítjük a függőségeket
RUN npm install

# 5. Bemásoljuk a teljes forráskódot
COPY . .

# 6. LEGYÁRTJUK az éles verziót (Build)
RUN npm run build

# 7. Megnyitjuk a 3000-es portot
EXPOSE 3000

# 8. Elindítjuk az alkalmazást
CMD ["npm", "start"]