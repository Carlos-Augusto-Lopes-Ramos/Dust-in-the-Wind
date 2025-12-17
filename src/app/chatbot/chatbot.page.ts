// src/app/chatbot/chatbot.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonInput, IonButton, IonIcon, IonSpinner, IonList, IonItem, IonLabel, IonText, IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline } from 'ionicons/icons';

interface Message {
  role: 'user' | 'assistant';
  content: string; // Mantemos como string para a lógica interna do componente
}

// Interface para o formato de mensagem que a API espera
interface ApiMessageContent {
  type: 'text';
  text: string;
}

interface ApiMessage {
  role: 'user' | 'assistant' | 'system';
  content: ApiMessageContent[];
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
    IonInput, IonButton, IonIcon, IonSpinner, IonList, IonItem, IonLabel, IonText, IonFooter
  ]
})
export class ChatbotPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  messages: Message[] = [];
  userMessage: string = '';
  isLoading: boolean = false;

  private readonly API_KEY = '';
  private readonly MODEL = 'google/gemini-2.0-flash-exp:free';
  private readonly API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

  constructor( ) {
    addIcons({ sendOutline });
    this.messages.push({
      role: 'assistant',
      content: 'Olá! Sou seu assistente de futebol. Pergunte-me sobre qualquer coisa relacionada a futebol!'
    });
  }

  ngOnInit() {}

  async sendMessage() {
    if (!this.userMessage.trim()) {
      return;
    }

    const currentMessage = this.userMessage.trim();
    this.messages.push({ role: 'user', content: currentMessage });
    this.userMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);

    try {
      const apiMessages: ApiMessage[] = [
        {
          role: 'system',
          content: [{ type: 'text' as const, text: 'Você é um especialista em futebol. Responda apenas a perguntas relacionadas a futebol. Se a pergunta não for sobre futebol, responda educadamente que você só pode falar sobre futebol e peça para o usuário reformular a pergunta.' }]
        },
        ...this.messages.slice(-5).map(msg => ({
          role: msg.role,
          content: [{ type: 'text' as const, text: msg.content }]
        }))
      ];

      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'HTTP-Referer': 'YOUR_SITE_URL', // Substitua pela URL do seu site em produção
          'X-Title': 'Placares ao Vivo App', // Substitua pelo nome do seu app
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: apiMessages
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Erro da API:', response.status, response.statusText, errorBody);
        throw new Error(`Erro da API: ${response.status} ${response.statusText || JSON.stringify(errorBody)}`);
      }

      const data = await response.json();
      console.log('Resposta completa da API:', data); // LOG 1: Resposta completa

      let assistantResponse: string = 'Não foi possível obter uma resposta válida.'; // Valor padrão

      // Tenta extrair a resposta de forma mais robusta
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const messageContent = data.choices[0].message.content;

        if (Array.isArray(messageContent) && messageContent.length > 0 && messageContent[0].type === 'text') {
          assistantResponse = messageContent[0].text;
        } else if (typeof messageContent === 'string') {
          // Alguns modelos podem retornar o content como uma string diretamente
          assistantResponse = messageContent;
        } else {
          console.warn('Formato de conteúdo da mensagem do assistente inesperado:', messageContent);
          assistantResponse = 'Resposta do bot em formato inesperado.';
        }
      } else {
        console.warn('Estrutura de resposta da API incompleta:', data);
        assistantResponse = 'Resposta da API incompleta.';
      }

      console.log('Mensagem do assistente extraída:', assistantResponse); // LOG 2: Mensagem extraída

      this.messages.push({ role: 'assistant', content: assistantResponse });

    } catch (error: any) {
      console.error('Erro ao enviar mensagem para o chatbot:', error);
      this.messages.push({
        role: 'assistant',
        content: 'Desculpe, não consegui processar sua solicitação no momento. Por favor, tente novamente mais tarde.'
      });
    } finally {
      this.isLoading = false;
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    }
  }
}
