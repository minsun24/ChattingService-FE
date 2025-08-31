<!-- <template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5">
                        채팅
                    </v-card-title>
                    <v-card-text>
                        <div class="chat-box" ref="chatBoxRef">
                            <div
                            v-for="(msg, idx) in messages"
                            :key="idx"
                            >
                            {{ msg }}
                        </div>
                        </div>
                        <v-text-field 
                            v-model="newMessage"
                            label="메시지 입력"
                            @keyup.enter = "sendMessage"
                        />  
                        <v-btn color="orange"  block @click="sendMessage">전송</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>


<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick  } from 'vue';

const ws = ref(null)             // WebSocket 인스턴스
const messages = ref([])         // 수신/발신 메시지
const newMessage = ref('')       // 입력 메시지
const chatBoxRef = ref(null) 

const connectWebSocket = () => {

    // 연결된 객체 없을 때만 다시 연결 생성하기. => 서버 부하 방지
    if(ws.value === null){
        ws.value = new WebSocket("ws://localhost:8080/connect")
    }else{
        console.log("✅ 이미 웹소켓에 연결되어 있습니다.")
    }

    // 연결 성공
    ws.value.onopen = () => {
        console.log("✅ Successfully connected WebSocket!")
    }

    // 메시지 받음
    ws.value.onmessage = (event) => {
        console.log("📩 Received Message: ", event.data)
        messages.value.push(String(event.data))
        scrollToBottom(); 

    }

    // 연결 종료
    ws.value.onclose = (ev) => {
        console.log("❌ Disconnected WebSocket!", ev?.code, ev?.reason)
        ws.value = null                    // 🔴 예기치 못한 종료 시에도 재연결 가능하게
    }

    // ##TODO. 메시지 들어오면

    // ##TODO. 연결이 끊기는 경우
}


// 메시지 보내는 메서드
const sendMessage = () => {
    const msg = newMessage.value.trim()
    if (!msg) return

    if(ws.value && ws.value.readyState === WebSocket.OPEN){
        console.log("메시지 전송: ", newMessage.value);
        ws.value.send(newMessage.value);    // 메시지 전송
        newMessage.value = "";  // 입력창 비우기
        scrollToBottom(); 
    }else{
        console.warn("WebSocket is not connected");
    }

}

// 메시지 스크롤
const scrollToBottom = async () => {
  await nextTick()  
  const el = chatBoxRef.value
  if (el) el.scrollTop = el.scrollHeight
}

// 웹소켓 연결 해제
const disconnectWebSocket = () => {
    if(ws.value){
        try{
            // CONNECTING/OPEN 상태에서만 close 시도 (권장)
            if (ws.value.readyState === WebSocket.OPEN || ws.value.readyState === WebSocket.CONNECTING) {
                ws.value.close(1000, 'component unmounted') // 선택: 종료 코드/사유
            }
            
        }finally{
            ws.value = null; 
            console.log("disconnected!");
        }
       
    }
}
// 마운트 시 
onMounted(() => {
    connectWebSocket();
})
onUnmounted(() => {
    disconnectWebSocket();
})


// watch 로 메시지 배열이 변할 때마다 자동 스크롤 
watch(messages, () => {
  scrollToBottom()
})
</script>



<style scoped>
.chat-box{
    height: 300px;
    overflow-y: auto;
    border: 1px solid #DDD;
    margin-bottom: 10px;
}
</style> -->