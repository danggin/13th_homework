import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const URI = "172.16.0.101"; // 원하는 접속 주소를 작성해주세요
// "10.0.2.2": 안드로이드에뮬레이터에서 접속하기
// "127.0.0.1": IOS시뮬레이터에서 접속하기

export default function 나의시작화면() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} />
      <WebView source={{ uri: `http://${URI}:3000/solplace-logs/new` }} />
    </SafeAreaView>
  );
}
