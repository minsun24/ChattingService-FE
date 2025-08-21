<template>
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
import Stomp from 'webstomp-client';
import axios from 'axios';

const messages = ref([])         // 수신/발신 메시지
const newMessage = ref('')       // 입력 메시지
const chatBoxRef = ref(null) 

const stompClient = ref(null)   // stompt 객체 

// 웹소켓 연결 메서드
const connectWebSocket = () => {

    // #TODO. STOMP 통신 연결 (sockJS)
    // sockJS 는 websocket 을 내장한 향상된 js 라이브러리. http 엔드포인트를 사용
    const sockJs = new SockJS(`${import.meta.env.VITE_API_URL}/connect`);        

    stompClient.value = Stomp.over(sockJs);    // 통신을 위한 STOMP 객체 생성

    stompClient.value.connect(
        () => {
            // #TODO. 채팅방 변수화 필요
            stompClient.subscribe(`/topic/1`, (message) => {
                messages.value.push(message.data);
                scrollToBottom();   // 스크롤
            })   
        }
    )
}


// 메시지 보내는 메서드
const sendMessage = () => {
    const msg = newMessage.value.trim()
    if (!msg) return

    stompClient.value.send(`/publish/1`, newMessage.value);
    newMessage.value = ""

}

// 메시지 스크롤
const scrollToBottom = async () => {
  await nextTick()  
  const el = chatBoxRef.value
  if (el) el.scrollTop = el.scrollHeight
}

// 웹소켓 연결 해제
const disconnectWebSocket = () => {
    // if(ws.value){
    //     try{
    //         // CONNECTING/OPEN 상태에서만 close 시도 (권장)
    //         if (ws.value.readyState === WebSocket.OPEN || ws.value.readyState === WebSocket.CONNECTING) {
    //             ws.value.close(1000, 'component unmounted') // 선택: 종료 코드/사유
    //         }
            
    //     }finally{
    //         ws.value = null; 
    //         console.log("disconnected!");
    //     }
       
    // }
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
</style>