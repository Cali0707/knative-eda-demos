# SinkBinding

Here, we are deploying function which calculates `f(x)=3x^2 + 5`, and sends the result to a second function which messages the result to slack. 
To deploy the functions, have a running k8s cluster, run `hack/install-deps.sh` in the root directory of this repo,
and then run `hack/install.sh` in this directory, which will create a secret and deploy your functions, using a sinkbinding to connect them.
To run the function, use `func invoke --data='{"x": 5}' --content-type=application/json` in the `fx` directory.
