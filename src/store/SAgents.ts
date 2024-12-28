import { defineStore } from "pinia";
import type IAgentes from "@/interface/IAgentes";
import axios from "axios";

const API_KEY = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

const storeAgents = defineStore("agents", {
  state: () => {
    return {
      agents: [] as IAgentes[],
    };
  },
  actions: {
    async baixaAgents() {
      if (this.agents.length === 0) {
        return axios.get(API_KEY).then((res) => {
          const data: IAgentes[] = res.data.data;
          this.agents = data;
        });
      } else {
        return;
      }
    },

    async agentById(id: string) {
      const agent = this.agents.find((agent) => {
        return agent.uuid === id;
      });
      return agent;
    },
  },
});

export default storeAgents;
