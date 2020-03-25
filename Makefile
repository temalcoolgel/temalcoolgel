# VERSION: pega a versão do commit no git 
VERSION 							= $(shell git describe --tags --always --match=v* 2> /dev/null || echo v0.0.1)

run-dev:
	docker-compose -f docker-compose.dev.yml up

down-dev:
	docker-compose -f docker-compose.dev.yml down

run-prod: 
	docker-compose -f docker-compose.prod.yml up -d
	
down-prod: 
	docker-compose -f docker-compose.prod.yml down

release-api: 
	docker build -t  temalcoolgel/app-api:$(VERSION) ./api
	docker tag temalcoolgel/app-api:$(VERSION) temalcoolgel/app-api:latest
	docker push temalcoolgel/app-api:$(VERSION)
	docker push temalcoolgel/app-api:latest
	
release-ui:
	docker build -t  temalcoolgel/app-ui:$(VERSION) ./ui
	docker tag temalcoolgel/app-ui:$(VERSION) temalcoolgel/app-ui:latest
	docker push temalcoolgel/app-ui:$(VERSION)
	docker push temalcoolgel/app-ui:latest
	
release-all: release-api release-ui

deploy: 
	zip -r temalcoolgel.zip proxy Dockerrun.aws.json 
	#TODO: validar se devemos usar o aws cli