# Usage

```sh
npm ci
npm start
```

## Problem Description

When paths contain placeholders like `('{localId}')` and we want to evaluate objects inside the path that contains the placeholder, then the message does not contain the correct path but instead only points to `$.paths`.

The correct behavior should show us the path to the evaluated object.
In this example to `$.components.schemas.PetStore.Dogs`.

If we would remove the placeholder it works as expected.
