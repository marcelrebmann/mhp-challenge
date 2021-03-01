# Backend Coding Challenge: Authentication


## Cloud Scenario Components
This repository contains the following components to realize the authentication cloud scenario:

|Component| Location | Description|
| --- | --- | --- |
|Authentication Server | /authserver | Keycloak server via Docker |
| Resource Server | /src | Java Spring Application |
| Client | /frontend | Angular Application


## MHP realm
This is the pre-configured realm for this scenario.
It contains user roles, groups and service configs for the authentication server.

#### User roles:
* `DOOR_VIEWER`: Permits to request the list of doors.
* `DOOR_USER`: Permits to update/modify (e.g. open/close) a door.

#### User groups
* `MHP_Internship`: Has role `DOOR_VIEWER` assigned.  
  Those users can see the list of doors in the client app.
* `MHP_Member`: Has role `DOOR_USER` assigned.  
Those users can open/close doors in the client app.
  
#### Services
`mhp-door-service`: The registered service that the Angular client uses for communication.


## How to get started

1. Make sure you have `Java, Docker, Node and npm` installed.
2. Start the Keycloak authentication server via `docker-compose up`
3. Open `localhost:8081` and login to the admin console.  
Use the initial admin account credentials:  
   Username: `admin`  
   Password: `demo123`

4. Import the MHP realm to configure the Authentication Server.  
Navigate to `Add realm -> Import`, then choose the realm file (`/authserver/mhp-realm.json`) and let Keycloak import it.
   
5. Create Users in the MHP realm  
On first startup, you need to create at least a single user.
   Make sure to add the user to one of the user groups `MHP_*`.
   
6. Start/Serve the resource server (Java, Spring backend)
7. Start the client via `npm start` within the `frontend` directory.
8. Navigate to `http://localhost:4200/` to interact.


## Description:

Within the framework of an agile project, new security mechanisms for an access system of doors are to be implemented. Until now, access to the system via network zones and VPN has been secured on an on-premises hosted system, thus, a security implementation was not mandatory until now. However, in the course of a planned migration to the cloud, this requirement has changed.

Access to the current version of the service is available to anyone who has access to the network. This access lets you access all doors and even unlock them. The service is accessible externally through a REST API and can be read and modified through this. This represents a security risk and must not be ignored.

Your first project as a new developer in the company will be to secure both endpoints of the service.

## Acceptance Criteria:

### (Junior) Consultant:

1. Both endpoints need to be secured with OAuth2
2. OAuth2 can be implemented with either Spring or Keycloak
3. OAuth2 should be implemented with a local authorization server

### Senior Consultant and above:

1. Both endpoints need to be secured with MTLS
2. MTLS can be implemented with either Spring, nginx or apache
3. Used certificates can either be self signed or valid ones for example from Let's encrypt
4. The backend/rest controller should validate the sent certificates

## General Conditions:
- The structure of the microservice at hand follows the Hexagonal-Architecture (aka. Clean Architecture - [https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)). Incorporate your implementation into the existing application architecture
- Additional dependencies can be added if needed, as well as external software like docker
- The included tests will only be successful when both endpoints return an HTTP 403
- You should complete this coding challenge within `3` days. Please keep this guidance in mind and submit your (partial) result upon expiration of this time frame
- If you draw up any notes or sketches during your implementation, please hand them in together with your solution

## Bonus Tasks (everyone):

- Write additional integration tests for your security implementation
- Secure both API endpoints with different credentials/roles/certificates

---

## Beschreibung:

Im Rahmen eines agilen Projekts sollen neue Sicherheitsmechanismen für ein Zugangssystem von Türen implementiert werden. Bisher wurde der Zugriff zum System über Netzwerkzonen und VPN auf ein On-Premises gehostetes System abgesichert. Daher war eine Sicherheitsimplementierung bisher nicht zwingend notwendig. Im Zuge einer geplanten Migration in die Cloud, hat sich diese Anforderung jedoch geändert.

Zugriff auf die aktuelle Version des Services hat jeder, der Zugang zum Netzwerk hat. Dieser Zugang lässt einen sämtliche Türen abrufen und diese sogar entriegeln. Der Service ist nach außen durch eine REST API erreichbar und kann über diese ausgelesen und verändert werden. Dies stellt ein Sicherheitsrisiko dar und darf nicht ignoriert werden.

Dein erstes Projekt als neuer Entwickler im Unternehmen wird es sein, beide Endpunkte des Services abzusichern.

## Akzeptanzkriterien:

### (Junior) Consultant:

1. Beide API Endpunkte sollen durch OAuth2 gesichert weren
2. OAuth2 kann entweder mit Spring oder Keycloak realisiert werden
3. OAuth2 soll mit einem lokalen Autorisierungsserver realisiert werden

### Senior Consultant und höher:

1. Beide API Endpunkte sollen durch MTLS gesichert weren
2. MTLs kann mit Spring, nginx oder apache realisiert werden
3. Die verwendeten Zertifikate können selbst signiert oder valide sein (z.B. von let's encrypt)
4. Das Backend/Rest Controller soll die gesendeten Zertifikate auf Validität prüfen

## Rahmenbedingungen:
- Die Struktur des vorliegenden Microservices folgt der Hexagonalen-Architektur (aka. Clean Architecture - [https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)). Halte dich bei deiner Implementierung an die bestehende Anwendungsarchitektur
- Zusätzlich Abhängigkeiten dürfen hinzugefügt werden, dies gilt auch für externe Software wie docker
- Die mitgelieferten Tests sind nur dann erfolgreich, wenn beide Endpunkte einen HTTP 403 zurückgeben. 
- Für diese Coding Challenge haben wir `3` Tage eingeplant. Bitte richte dich bei deiner Umsetzung nach diesem Richtwert und reiche dein (Teil-)Ergebnis nach Ablauf dieser Arbeitszeit ein
- Solltest du während der Bearbeitung Zeichnungen oder Notizen anfertigen, reiche diese zusammen mit deiner Lösungen ein

## Bonusaufgaben (alle):

- Schreibe zusätzlich Integration Tests für deine Sicherheitsimplementierung
- Sichere beide API Endpunkte durch unterschiedliche Zugangsdaten/Rollen/Zertifikate
