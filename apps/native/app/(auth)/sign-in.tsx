import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

import {
  SignInSchema,
  StorageKeys,
  api,
  fields,
  profileAtom,
  signInAtom,
  signInSchema,
  useRecoilMutation
} from "@digitask/shared-lib";
import { AuthHttp, Block, ErrorMessageViewer, Form, Input, When, logger } from "@mdreal/ui-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from "../../assets/images/logo.png";

const authHttpSettings = AuthHttp.settings();

export default function SignIn() {
  const navigation = useNavigation();

  useEffect(() => {
    const settings = AuthHttp.settings();
    settings.removeTokens().then(settings.retrieveTokens());
  }, []);

  const signInMutation = useRecoilMutation(signInAtom, {
    mutationFn: (data: SignInSchema) => api.accounts.login.$post(data),
    async onSuccess(data) {
      await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, data.access_token);
      await AsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refresh_token);
      await AsyncStorage.setItem(StorageKeys.USER_EMAIL, data.email);
      await AsyncStorage.setItem(StorageKeys.PHONE_NUMBER, data.phone);
    },
    onError: e => e,
    isNullable: true
  });

  const profileMutation = useRecoilMutation(profileAtom, {
    mutationKey: [fields.user.profile.toString()],
    mutationFn: () => api.accounts.profile.$get,
    onError: logger.error.bind(logger, "digitask.native:auth:sign-in.profile-error"),
    isNullable: true
  });

  const onSubmit = async (data: SignInSchema) => {
    await signInMutation.mutateAsync(data);
    await authHttpSettings.retrieveTokens()();
    // @ts-ignore
    await profileMutation.mutateAsync();

    // @ts-ignore
    navigation.navigate("(dashboard)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })}>
      <Form<SignInSchema> schema={signInSchema} onSubmit={onSubmit}>
        <Block className="flex h-full items-center justify-between px-4 pb-12 pt-28">
          <Block className="flex items-center gap-6">
            <Block className="bg-primary w-68 rounded-2xl p-6">
              <Image source={logo} style={{ width: 150, height: 140 }} />
            </Block>

            <Block className="flex gap-6">
              <Input.Controlled
                name="email"
                type="text"
                label="Elektron poçt"
                variant="secondary"
                icon={{ left: "email" }}
                disabled={signInMutation.isPending}
                className="border-primary rounded-2xl"
              />
              <Input.Controlled
                name="password"
                type="password"
                label="Şifrə"
                variant="secondary"
                icon={{ left: "key" }}
                disabled={signInMutation.isPending}
                className="border-primary rounded-2xl"
              />
            </Block>
          </Block>

          <When condition={signInMutation.isError}>
            <ErrorMessageViewer error="Elektron poçt və ya şifrə yanlış daxil edilib" />
          </When>

          <Block className="flex gap-6">
            <Form.Button variant="primary" className="w-full p-4" isLoading={signInMutation.isPending}>
              <Text className="text-center text-white">Daxil ol</Text>
            </Form.Button>

            <Block>
              {/*<Link href="./forgot-password">*/}
              {/*  <Text className="text-link text-center underline">Şifrəni unutmusunuz?</Text>*/}
              {/*</Link>*/}
            </Block>
          </Block>
        </Block>
      </Form>
    </KeyboardAvoidingView>
  );
}
