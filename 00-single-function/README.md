# Single Function

Here, we are deploying a single function, which calculates `f(x)=3x^2 + 5`. To deploy the function, have a running k8s cluster, run `hack/install-deps.sh`,
and then `cd fx && func deploy`. You will be asked to specify a container registry to use. To run the function, use `func invoke --data='{"x": 5}'` in the `fx` directory.
