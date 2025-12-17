# 🌬️ Dust in the Wind

Aplicativo **mobile híbrido multiplataforma** desenvolvido com **Ionic + Angular**, focado em desempenho, reutilização de código e fácil manutenção. O projeto consome **APIs externas**, possui **API própria para autenticação** e integra **Inteligência Artificial** para enriquecer a experiência do usuário.

---

## 📌 Visão Geral

Este repositório documenta a arquitetura, tecnologias, organização e funcionamento do aplicativo **Dust in the Wind**. A aplicação foi projetada para rodar em **Android, iOS e Web**, utilizando uma base de código única.

Principais objetivos do projeto:

* Multiplataforma com código reutilizável
* Arquitetura escalável e organizada
* Integração com serviços externos e IA
* Segurança e controle de acesso

---

## 🛠️ Tecnologias Utilizadas

* **Ionic Framework** – Desenvolvimento de aplicações híbridas
* **Angular** – Arquitetura baseada em componentes e módulos
* **TypeScript** – Tipagem estática e organização do código
* **SCSS (Sass)** – Estilização avançada e modular
* **HTML5** – Estrutura das interfaces

### 🔧 Ferramentas e Bibliotecas

* **Node.js / NPM** – Gerenciamento de dependências
* **Capacitor** – Acesso a recursos nativos do dispositivo
* **RxJS** – Programação reativa
* **Angular HttpClient** – Comunicação HTTP com APIs

---

## 🏗️ Arquitetura do Aplicativo

O projeto segue a arquitetura padrão do **Ionic com Angular**, baseada em **componentes**, **serviços** e **módulos**, garantindo organização e facilidade de manutenção.

```bash
src/
├── app/
│   ├── core/           # Serviços centrais e configurações globais
│   ├── pages/          # Páginas do aplicativo
│   ├── services/       # Serviços de API e regras de negócio
│   ├── models/         # Interfaces e tipagens
│   ├── app.module.ts   # Módulo principal
│   └── app-routing.module.ts
├── assets/             # Imagens e arquivos estáticos
├── theme/              # Variáveis globais SCSS
└── environments/       # Configurações por ambiente
```

---

## 🎨 Estilização com SCSS

O uso de **SCSS** permite maior controle visual e melhor organização do CSS.

* Cada página possui seu próprio arquivo `.scss`
* Variáveis globais centralizadas em `theme/`
* Estilos modulares e reutilizáveis

---

## 🧠 Uso de TypeScript

O **TypeScript** é utilizado para:

* Tipagem dos dados recebidos das APIs
* Organização da lógica de negócio
* Redução de erros em tempo de desenvolvimento
* Melhor suporte a refatorações

---

## 🌐 Consumo de APIs Externas

O aplicativo consome **APIs REST externas** para:

* Obtenção de dados dinâmicos
* Integração com serviços de **Inteligência Artificial**
* Atualização em tempo real de informações

---

## 🔐 API Própria

Uma das APIs utilizadas foi **desenvolvida pelo próprio autor**, sendo responsável principalmente pela **autenticação de usuários** e controle de acesso às funcionalidades do app.

### Características da API

* Arquitetura **REST**
* Comunicação via **JSON**
* Autenticação baseada em **token**
* Endpoints documentados

---

## ⚙️ Gerenciamento de Ambientes

As configurações são separadas por ambiente:

* `environment.ts` – Desenvolvimento
* `environment.prod.ts` – Produção

Exemplo:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://api.exemplo.com'
};
```

---

## 🔒 Segurança

O aplicativo implementa boas práticas de segurança, incluindo:

* Validação de dados no frontend
* Comunicação via **HTTPS**
* Uso de **tokens de autenticação**
* Proteção contra chamadas inválidas

---

## 🚀 Build e Deploy

### Comandos Principais

```bash
ionic serve
ionic build
ionic cap run android
ionic cap run ios
```

### Plataformas Suportadas

* 🌐 Web
* 🤖 Android
* 🍎 iOS

---

## 🤖 Integração com Inteligência Artificial (IA)

O aplicativo conta com integração com serviços de **IA**, incluindo um **chatbot personalizado** voltado para interações relacionadas a **futebol**.

### Objetivos da Integração

* Análise e interpretação de dados fornecidos pelo usuário
* Geração de respostas inteligentes e contextualizadas
* Apoio à tomada de decisão dentro do aplicativo
* Automação de funcionalidades específicas

---

## 📚 Considerações Finais

O **Dust in the Wind** apresenta uma arquitetura moderna, escalável e de fácil manutenção. A combinação de **Ionic**, **Angular**, **TypeScript**, **SCSS**, **APIs externas**, **API própria** e **IA** garante robustez e flexibilidade ao projeto.

Esta documentação serve como base para:

* Manutenção do código
* Evoluções futuras
* Apresentações acadêmicas ou profissionais

---

### 📱 Resumo

* **Tipo:** Aplicação Mobile Híbrida
* **Framework:** Ionic + Angular
* **Estilização:** SCSS
* **Integrações:** APIs externas, API própria e Inteligência Artificial
