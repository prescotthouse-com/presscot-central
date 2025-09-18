# Prescott House - Official Website

> *"At Prescott House, we refuse the narrative of hopelessness. Addiction is not the end of the story. Transformation is possible."*

A modern, responsive website for Prescott House, Arizona's premier behavioral health treatment center, established in 1988.

## 🏥 About Prescott House

Prescott House is a licensed behavioral health facility (Arizona License #BH-4262) that has been providing compassionate, evidence-based addiction recovery and mental health treatment since 1988. Located in Prescott, Arizona, we specialize in:

- **Substance Use Disorder Treatment** - Structure, accountability, and trauma-informed healing
- **Gambling Addiction Recovery** - Breaking free from compulsive betting cycles  
- **Love and Intimacy Disorder Treatment** - Healing patterns that block trust and connection

### Our Mission
*From our manifesto:* We create a structured environment where accountability meets compassion. We do not promise ease, but we do promise healing. At Prescott House, recovery is not just treatment—it is rebirth, a sanctuary where men learn to live again.

## 🛠 Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Routing:** React Router (HashRouter for GitHub Pages)
- **Styling:** CSS-in-JS with centralized color system
- **Animations:** Framer Motion
- **Icons:** Font Awesome
- **Build Tool:** Vite
- **Deployment:** GitHub Pages (easily migrated to Render)
- **HTTP Client:** Native fetch (not Axios)

## 🎨 Design System

### Color Management
All colors are managed through a centralized system in `src/utils/colors.js` [[memory:8299192]]. **Nothing is hardcoded** - all color values are imported from this single source, making theme adjustments effortless.

```javascript
// Example usage
import { getPalette } from '../utils/colors.js';
const { palette } = useDarkMode();
// Use palette.primary, palette.background, etc.
```

### Design Language
- **Clean, professional aesthetic** suitable for healthcare
- **Mobile-first responsive design**
- **Accessibility-focused** with proper touch targets and contrast
- **Dark/light mode support** with seamless transitions

## 📁 Project Architecture

### Simple Two-Part System
This project follows a clean architecture with just two main components:

1. **Site Data (`json/mainSiteData.json`)** - All content, copy, links, and configuration
2. **UI Components** - React components that render the data

### Key Files
```
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
├── utils/
│   ├── colors.js       # Centralized color system
│   ├── imagePaths.js   # Image path utilities
│   └── touchUtils.js   # Mobile touch optimization
├── contexts/           # React contexts (dark mode)
└── json/
    ├── mainSiteData.json       # Primary site content
    └── prescott_house_manifesto.json  # Organization manifesto
```

## 🔄 Content Management System (CMS) Plan

### Current Workflow
1. **Client edits** `json/mainSiteData.json` with new content
2. **Client submits** iterations to development team
3. **Developer deploys** updated content

### Future API Integration
- Use native **fetch** (not Axios) for API connections
- JSON structure is already API-ready
- Easy migration path to headless CMS

## 👥 Project Team

### Leadership & Oversight
**Mia Friedman** - Project leadership and oversight for Prescott House

### Design
**Kellie Broyn** - Design and assets  
*Brooklyn, NY*

### Development  
**Rafi Barides** - Full-stack development  
*RBM LLC*  
📧 rafibaridesstudio@gmail.com

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile Optimization

The site includes comprehensive mobile optimizations:
- **Touch-first interactions** with proper touch targets (44px minimum)
- **No double-tap delays** through smart touch detection
- **Responsive typography** using clamp() for fluid scaling
- **Touch-aware hover states** that differentiate between mouse and touch users

## 🔒 Security & Compliance

- **HIPAA Compliant** design patterns
- **Content Security Policy** implemented
- **No external tracking** or suspicious third-party content
- **Healthcare-specific** legitimacy markers and verification
- **Arizona state licensing** clearly displayed

## 🎯 Performance Features

- **Image preloading** for smooth parallax effects
- **Optimized animations** using requestAnimationFrame
- **Lazy loading** with Intersection Observer
- **Minimal dependencies** for fast load times

## 🌐 Deployment

### Current: GitHub Pages
- Automated deployment from `main` branch
- Hash routing for SPA compatibility
- Custom domain ready

### Migration Option: Render
The project is designed for easy migration to Render or other hosting platforms:
- Standard React build process
- Environment-agnostic configuration
- No platform-specific dependencies

## 📄 Key Features

### Healthcare-Focused Design
- **Professional medical aesthetic** without clinical coldness
- **Trust-building elements** throughout the user journey
- **Clear calls-to-action** for treatment inquiries
- **Accessibility compliance** for diverse user needs

### Content Structure
- **Modular JSON content** for easy updates
- **SEO-optimized** page structure and metadata
- **Schema markup** for search engine understanding
- **Comprehensive sitemap** for crawling and indexing

### User Experience
- **Intuitive navigation** with clear program differentiation
- **Smooth animations** that enhance rather than distract
- **Fast loading** with optimized assets and code splitting
- **Cross-browser compatibility** with modern web standards

## 🔧 Customization

### Colors & Theming
All visual styling can be adjusted through `src/utils/colors.js`. The system supports:
- Light/dark mode variants
- Brand color customization  
- Consistent application across all components

### Content Updates
Edit `json/mainSiteData.json` to update:
- Page content and copy
- Navigation structure
- Contact information
- Program details
- Team member information

## 📞 Support & Maintenance

For technical support, updates, or customizations:  
**Rafi Barides** - rafibaridesstudio@gmail.com

---

*Built with ❤️ for those seeking recovery and transformation*

**Prescott House** - Licensed Healthcare Provider • Arizona License #BH-4262 • Established 1988
