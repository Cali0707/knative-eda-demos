# Single Function

Here, we are deploying function which calculates `f(x)=3x^2 + 5`, and sends the result to a second function which messages the result to slack. 
To deploy the functions, have a running k8s cluster, run `hack/install-deps.sh`,
and then `cd fx && func deploy`, as well as `cd slack-message && func deploy`. You will be asked to specify a container registry to use. 
To run the function, use `func invoke --data='{"x": 5}' --content-type=application/json`.
