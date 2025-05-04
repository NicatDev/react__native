FROM base

WORKDIR /app

# Install dependencies
RUN apk update && apk add \
    bash curl openjdk11 git unzip wget make gcc \
    g++ libc6-compat && \
# Install Android SDK
    mkdir -p /opt/android-sdk && \
    cd /opt/android-sdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip && \
    unzip commandlinetools-linux-8512546_latest.zip && \
    rm commandlinetools-linux-8512546_latest.zip && \
    mkdir ~/.android && \
    touch ~/.android/repositories.cfg

ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/platform-tools:$PATH
ENV EXPO_TOKEN=9SqMi8pfY2CiWGx4KFn2OafqJrvIX6dgV4COOoMY
ENV EXPO_PUBLIC_API_URL=http://135.181.42.192

RUN yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME
WORKDIR /app/apps/native
COPY app app
COPY assets assets
COPY components components
COPY hooks hooks

RUN sdkmanager --sdk_root=$ANDROID_HOME --install "platform-tools" "platforms;android-33" "build-tools;33.0.0" "cmdline-tools;latest" "ndk;23.1.7779620" \
                            "extras;google;google_play_services" "extras;android;m2repository"
VOLUME /opt/android-sdk

RUN yarn eas build --platform android
