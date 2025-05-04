FROM base

WORKDIR /app/apps/native
COPY . .

ENV EXPO_TOKEN=ljSvqjpe92xWVjzzJio5KbtSFCHfq6jBvXvVV_9_
ENV EXPO_PUBLIC_API_URL=http://135.181.42.192

CMD yarn start
