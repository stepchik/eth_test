FROM alpine:3.14.6
RUN apk add geth
EXPOSE 8545 8546 30303 30303/udp
ENTRYPOINT ["geth","--rpc", "--rpcaddr","0.0.0.0","--rpcapi","eth,web3,debug","--datadir","data"]