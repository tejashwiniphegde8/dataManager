# Tissue-Vission Data Manager

The **Tissue-Vission Data Manager** is a web-based application designed to help users manage and download biological dataset files. It provides a user-friendly interface for browsing datasets, viewing details, and handling file downloads with progress tracking.

## Features

- **Dataset Listing:** Browse datasets.
- **Details Panel:** View detailed information about each dataset.
- **Download Management:** Download files with real-time progress updates.
- **Pagination:** Efficiently navigate large lists of datasets.

## Tech Stack

- **Frontend:** React, TypeScript, Material-UI (MUI)
- **API:** Communicates with a backend via RESTful endpoints (API URL configured via environment variables)

---

## Getting Started

### Prerequisites

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tissue-vission/dataManager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root of the `dataManager` directory and set the API URL:
   ```
   VITE_API_URL=http://your-api-url
   ```

### Running the Application

Start the development server:
   ```bash
   npm run dev
   ```
   This will start the app at [http://localhost:5173](http://localhost:5173) (or the port specified in your environment).



