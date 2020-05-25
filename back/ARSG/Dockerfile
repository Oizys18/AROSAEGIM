FROM openjdk:8-jdk-alpine
ARG arsg_version=0.0.11
ARG JAR_FILE=./target/ARSG-${arsg_version}-SNAPSHOT.jar
COPY ${JAR_FILE} ARSG-${arsg_version}-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/ARSG-${arsg_version}-SNAPSHOT.jar"]