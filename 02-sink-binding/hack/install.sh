#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)/..
kubectl apply -f "${ROOT_DIR}/config/slack-token.secret.yaml"
kubectl apply -f "${ROOT_DIR}/config/sinkbinding.yaml"
(cd "${ROOT_DIR}/slack-message" && func deploy --build)
(cd "${ROOT_DIR}/fx" && func deploy --build)
