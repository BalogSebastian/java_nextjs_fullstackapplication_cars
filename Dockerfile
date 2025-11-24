# 1. JAVÍTÁS: Az Eclipse Temurin képet használjuk, ami stabil
FROM eclipse-temurin:21-jdk

# 2. Beállítjuk a munkakönyvtárat
WORKDIR /app

# 3. Bemásoljuk a lefordított .jar fájlt
COPY target/*.jar app.jar

# 4. Indítás
ENTRYPOINT ["java", "-jar", "app.jar"]