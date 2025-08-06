<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원 목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>EMAIL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in memberList" :key="member.id">
                                    <td>{{ member.id }}</td>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td>
                                        <v-btn>채팅하기</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMemberList } from '@/api/members'

const memberList = ref([]);

onMounted(async () => {
    const res = await getMemberList(); 
    memberList.value = res.data.data; 
    console.log(res.data);
})

</script>
