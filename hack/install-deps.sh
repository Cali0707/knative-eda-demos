#!/usr/bin/env bash

# Copyright 2023 Calum Murray
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script assumes that you have a running kubernetes cluster, and have configured kubectl correctly.

# Install Knative Serving

kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.11.0/serving-crds.yaml

kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.11.0/serving-core.yaml

# Install networking layer

kubectl apply -f https://github.com/knative/net-kourier/releases/download/knative-v1.11.1/kourier.yaml

kubectl patch configmap/config-network \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'

# Install Knative Eventing

kubectl apply -f https://github.com/knative/eventing/releases/download/knative-v1.11.2/eventing-crds.yaml

kubectl apply -f https://github.com/knative/eventing/releases/download/knative-v1.11.2/eventing-core.yaml

# Install the In-Memory Channel

kubectl apply -f https://github.com/knative/eventing/releases/download/knative-v1.11.2/in-memory-channel.yaml

# Install the MT-Channel-based broker

kubectl apply -f https://github.com/knative/eventing/releases/download/knative-v1.11.2/mt-channel-broker.yaml

