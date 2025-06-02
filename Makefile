.PHONY: package-install
package-install:
	npm install

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build:	package-install lint
	npm run build

.PHONY: test
test: test-unit

.PHONY: sonar
sonar: test
	npm run sonarqube

.PHONY: security-check
security-check:
	npm audit

.PHONY: test-unit
test-unit:
	npm run test
