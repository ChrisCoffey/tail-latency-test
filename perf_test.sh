#! /usr/bin/env bash

for i in {1..10}; do
  curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:80.0) Gecko/20100101 Firefox/80.0" https://long-load-test.herkouapp.com/run
  sleep 2
done
