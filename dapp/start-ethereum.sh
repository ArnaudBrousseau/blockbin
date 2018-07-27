#!/usr/bin/env bash
read -p 'Private key (to provision with 300 ETH): ' PRIVATE_KEY
echo 'Starting...'
testrpc --account "$PRIVATE_KEY, 300000000000000000000"
