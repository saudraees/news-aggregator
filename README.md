# News Aggregator

## Introduction
News Aggregator is a mobile-friendly platform developed for users who want news from their choice of sources, categories, and authors all in one place. This website is built using React.js. 

## Features
### Article Searching
- Users can search for articles by keywords.
- Results are fetched from multiple sources and displayed to the user.
- Users can apply filters on the fetched articles based on:
  - Publication date
  - Category
  - Source

### Article Filtering
- Users can filter the fetched articles by:
  - Category
  - Source
  - Date Published

### Personalized News Feed
- Users can also personalize their news feed by specifying preferences such as:
  - Favorite authors
  - Preferred categories
  - Preferred sources
- The website stores user preferences in our local storage.

### Infinite Loading
- Users can continue scrolling down to load more articles by clicking the "Load More" button.

### Data Sources
- The website integrates with NewsAPI, The Guardian, and NY Times to pull in a diverse range of articles.

### Mobile-Responsive Design
- The website is fully optimized for mobile devices, providing a seamless experience across different screen sizes.

### Error Handling and Notifications
- The app includes robust error handling mechanisms that provide users with clear feedback in case of any issues with loading articles.
- If an error occurs while fetching data from any of the sources, a user-friendly error message is displayed.

## Live Website
https://news-aggregator-dusky-kappa.vercel.app/
Articles from NewsAPI will not be fetched on the live application due to its limitations on a developer account.

## How to Run
### Prerequisites
Before running the application, ensure you have installed Docker on your machine. You can download Docker from [Docker's official website](https://www.docker.com/get-started).

### Step 1: Clone the Repository
If you haven't already, clone the repository:

git clone https://github.com/yourusername/your-repo.git

cd your-repo

### Step 2: Build and Run the Docker Container
Navigate to the root directory of your project (where the Dockerfile is located) and build the Docker image, then run the container:

Build the Docker image

**docker build -t news-aggregator .**

Run the Docker container

**docker run -p 3000:3000 news-aggregator**

where

-t news-aggregator: Tags the image with the name news-aggregator.

. : Specifies the current directory as the build context.

### Step 3: Access the Application

Once the container is running, open your web browser and navigate to:

http://localhost:3000

You should see the application running.
