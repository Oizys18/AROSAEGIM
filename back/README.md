# Backend

## Deployment

배포를 하기 위한 설정이 몇 가지 있습니다.

1. `back/ARSG/pom.xml`의 버전 정보를 수정(필수는 아니지만 권장)

    ```xml
    ...
    	<groupId>com.ssafy</groupId>
        <artifactId>ARSG</artifactId>
        <version>0.0.11-SNAPSHOT</version> <!-- 이 부분의 버전을 수정합니다. -->
        <packaging>jar</packaging>
        <name>ARSG</name>
        <description>ARSG project for Spring Boot</description>
    ...
    ```

2. `back/ARSG/main/resources/application.properties`의 내용을 수정

    - 이는 서버의 도커 컴포즈에서 이미지를 활용하기 위함입니다.
    
    ```
    spring.datasource.url=jdbc:mariadb://db:3306/arsg
    ```
3. maven을 이용하여 `.jar` 파일 빌드

    ```bash
    # -DskipTests 옵션은 로컬
    $ mvn package -DskipTests
    ```

4. `Dockerfile`의 버전 정보를 수정(1에서 버전 정보를 수정했다면 그 버전과 맞춰줍니다.)

    ```Dockerfile
    FROM openjdk:8-jdk-alpine
    ARG arsg_version 0.0.11 # 이 부분 수정
    ARG JAR_FILE=./target/ARSG-${arsg_version}-SNAPSHOT.jar
    COPY ${JAR_FILE} ARSG-${arsg_version}-SNAPSHOT.jar
    ENTRYPOINT ["java","-jar","/ARSG-${arsg_version}-SNAPSHOT.jar"]
    ```

5. docker 빌드 및 push

    ```bash
    # 도커 로그인이 안되어 있을 경우 먼저 로그인 : 로그인되어있다면 push 가능
    $ docker login -u ssafy205
    password: # 패스워드 입력

    $ docker build -t ssafy205/arsg-backend:[버전 정보] .
    $ docker push ssafy205/arsg-backend:[버전 정보]
    ```

6. AWS의 `docker-compose.yml` 수정 후 컨테이너 실행

    `docker-compose.yml`에 도커 허브에 올라가있는(빌드된) 이미지의 태그로 수정한다.

    ```yml
    backend:
        depends_on: 
            - db
        container_name: backend
        image: ssafy205/arsg-backend:[버전 정보] # 여기를 수정
        ports:
            - 8080:8080
        networks:
            - default
    ```

    컨테이너 실행

    ```bash
    $ cd ~/db
    $ sudo docker-compose up -d # 이 때 db 컨테이너는 재시작되지 않고, backend가 실행
    ```


### 결과 확인 및 모니터링, 디버깅

```bash
$ docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                    NAMES
a92536c98b30        ssafy205/arsg-backend:0.11   "java -jar /ARSG-0.0…"   31 minutes ago      Up 31 minutes       0.0.0.0:8080->8080/tcp   backend
bf1330516a3b        mariadb:10.4                 "docker-entrypoint.s…"   48 minutes ago      Up 48 minutes       3306/tcp                 db
```

모든 컨테이너가 정상 실행되고 있으면 성공.

만약 제대로 실행되지 않는다면 로그를 확인하여 문제를 해결합니다. 로그는 돌아가고 있는 컨테이너와 종료된 컨테이너 모두 볼 수 있으므로 모니터링과 디버깅 모두에 사용될 수 있습니다.

```bash
$ docker logs -f [container_name]
...logs
```
