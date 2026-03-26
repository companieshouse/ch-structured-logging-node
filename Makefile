.PHONY: clean
clean:
	rm -rf ./coverage
	rm -rf ./dist

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

.PHONY: dependency-check
dependency-check:
	npm audit

.PHONY: test-unit
test-unit: clean
	npm run test:coverage

