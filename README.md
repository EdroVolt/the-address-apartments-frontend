# The Address Apartments - Frontend

## Project Overview
A modern web application built with Next.js and React for managing and showcasing luxury apartment listings. Provides users with an intuitive interface to explore properties, view details, and manage reservations.

## Key Features
- Responsive property listings with filtering
- Interactive image galleries
- User authentication system
- Admin dashboard for property management
- Integration with backend API services

## Installation

### Prerequisites
- Node.js v20+
- npm v9+

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/your-username/the-address-apartments-frontend.git
cd the-address-apartments-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Docker Deployment
```bash
# Build Docker image
docker build -t address-frontend .

# Run container
docker run -p 3000:3000 address-frontend
```

## API Configuration
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Development
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Deployment
### Vercel
1. Push changes to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy!

### Docker Production
```bash
docker compose up --build -d
```
