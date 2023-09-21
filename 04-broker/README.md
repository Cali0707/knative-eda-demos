# Channel

Here, we are using a channel to connect to producer functions and two consumer functions. The producer functions calculate `f(x)=3x^2 + 5` and `f(y)=150sin(y)`.
If the result of the calculation is greater than 100, then the producers set the `message` field in the event data to indicate this. Otherwise, they put the result
in the `result` field of the data. The first consumer will send a message to the slack channel if there is data in the `message` field, and the second
does the same but if there is data in the `result` field. 

To run these examples, ensure you have a k8s cluster which has knative installed (using `hack/install-deps.sh` in the root directory of this repo), and then run
`hack/install.sh` in this directory to create the necessary knative resources and deploy the functions to the cluster.
