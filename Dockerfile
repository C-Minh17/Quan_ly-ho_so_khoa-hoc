# 1. For build React app
FROM node:22-alpine AS development


# Set environment variables
ENV APP_CONFIG_IP_ROOT=https://ai.smartcom.vn/learn-api
ENV APP_CONFIG_IP_AI=https://ai.smartcom.vn/ai-service
ENV APP_CONFIG_URL_AI=https://ai.smartcom.vn
ENV APP_CONFIG_ONE_SIGNAL_ID=673b41d4-46fb-45c6-987c-9ec7b365f817
ENV APP_CONFIG_SENTRY_DSN=https://ed934e521d476c44a89a42aaa8a6993a@sentry.aisoftech.vn/3
ENV APP_CONFIG_KEYCLOAK_AUTHORITY=https://ai.smartcom.vn/learn-sso/realms/smartcom
ENV APP_CONFIG_PREFIX_OF_KEYCLOAK_CLIENT_ID=smartcom-portal
ENV APP_CONFIG_KEYCLOAK_CLIENT_SECRET=I1mGdz2EdtzXzHGg1UoWI1N6V8n0tOTx
ENV APP_CONFIG_APP_VERSION=231130


ENV APP_CONFIG_TEN_TRUONG='SMARTCOM IELTS TEST'
ENV APP_CONFIG_TIEN_TO_TRUONG=''
ENV APP_CONFIG_TEN_TRUONG_VIET_TAT_TIENG_ANH=WB
ENV APP_CONFIG_PRIMARY_COLOR="#1890ff"

ENV APP_CONFIG_URL_LANDING=https://hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CONNECT=https://sinhvien.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CAN_BO=https://canbo.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_DAO_TAO=https://qldt.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_NHAN_SU=https://tcns.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_TAI_CHINH=https://taichinh.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CTSV=https://ctsv.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_QLKH=https://qlkh.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_VPS=https://vanphong.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_KHAO_THI=https://khaothi.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CORE=https://core.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CSVC=https://csvc.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_THU_VIEN=https://thuvien.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_QLVB=https://sso.hvpnvn.edu.vn/realms/vwa/protocol/openid-connect/auth?response_type=token&client_id=vwa-odoo-qlvb&redirect_uri=http%3A%2F%2Fqlvb.hvpnvn.edu.vn%2Fauth_oauth%2Fsignin&scope=profile+openid+email&state=%7B%22d%22%3A+%22qlvb1%22%2C+%22p%22%3A+4%2C+%22r%22%3A+%22http%253A%252F%252Fqlvb.hvpnvn.edu.vn%252Fweb%22%7D
ENV APP_CONFIG_URL_VBCC=https://vbcc.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_QLND=https://iam.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_TAP_CHI_KH=https://tapchikhoahoc.hvpnvn.edu.vn/


# Set working directory
WORKDIR /app

COPY package.json /app/
RUN yarn install

COPY . /app

FROM development AS build
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/website

RUN rm -rf ./*
COPY --from=build /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
