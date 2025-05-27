// Modern Cybersecurity Portfolio JavaScript
class CyberPortfolio {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.setupMobileMenu();
    this.setupProjectFilters();
    this.setupBlogFunctionality();
    this.setupContactForm();
    this.setupModals();
    this.setupScrollEffects();
    this.setupAnimations();
  }

  init() {
    // Initialize portfolio
    this.loadBlogPosts();
    this.initializeSkillBars();
    this.setupLazyLoading();
  }

  setupEventListeners() {
    // Navigation active state
    this.updateActiveNavigation();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Window scroll events
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Window resize events
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close mobile menu when clicking on nav links
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
    }
  }

  setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category') || '';
          const shouldShow = category === 'all' || cardCategories.includes(category);
          
          if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  setupBlogFunctionality() {
    this.setupBlogFilters();
    this.setupBlogSearch();
    this.setupBlogActions();
    this.setupLoadMore();
  }

  setupBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter blog posts
        this.filterBlogPosts(category);
      });
    });
  }

  setupBlogSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const searchBtn = document.getElementById('blog-search-btn');

    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.searchBlogPosts(searchInput.value.trim());
        }, 300);
      });

      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          this.searchBlogPosts(searchInput.value.trim());
        });
      }
    }
  }

  setupBlogActions() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        this.expandBlogPost(e.target);
      } else if (e.target.classList.contains('read-less')) {
        this.collapseBlogPost(e.target);
      } else if (e.target.closest('.share-btn')) {
        this.shareBlogPost(e.target.closest('.share-btn'));
      }
    });
  }

  setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreBlogPosts();
      });
    }
  }

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmission(contactForm);
      });

      // Real-time validation
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    }
  }

  setupModals() {
    // Modal triggers
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-trigger')) {
        e.preventDefault();
        const modalId = e.target.getAttribute('href');
        this.openModal(modalId);
      } else if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
        this.closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  setupScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      });
    }

    // Intersection Observer for animations
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for skill bars
          if (entry.target.classList.contains('skill-item')) {
            this.animateSkillBar(entry.target);
          }
          
          // Special handling for counters
          if (entry.target.classList.contains('metric-value')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .project-card, .blog-card, .skill-item, .metric-card, .approach-item, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
  }

  setupAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        animation: fadeInUp 0.6s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Blog functionality
  loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    const blogPosts = this.getBlogPostsData();
    this.currentPosts = blogPosts.slice(0, 5);
    this.allPosts = blogPosts;
    this.filteredPosts = blogPosts;

    this.renderBlogPosts(this.currentPosts);
  }

  getBlogPostsData() {
    return [
      {
        id: 1,
        title: "Modern Hacking Lab: AI-Powered Security Testing",
        category: "ai",
        date: "2025-01-15",
        readTime: "8 min",
        excerpt: "Exploring how artificial intelligence is revolutionizing cybersecurity testing and defense mechanisms in today's digital landscape.",
        content: `
          <p>Artificial intelligence is transforming the cybersecurity landscape, offering unprecedented capabilities for both defensive and offensive security operations. In this comprehensive guide, we'll explore how AI is being integrated into modern penetration testing and security assessment workflows.</p>
          
          <h3>The Evolution of AI in Cybersecurity</h3>
          <p>Traditional security testing relied heavily on manual processes and signature-based detection systems. While effective, these approaches struggled to keep pace with the rapidly evolving threat landscape. AI introduces several key advantages:</p>
          
          <ul>
            <li><strong>Pattern Recognition:</strong> AI can identify complex patterns in network traffic and system behavior that might indicate security threats.</li>
            <li><strong>Automated Analysis:</strong> Machine learning algorithms can process vast amounts of security data in real-time.</li>
            <li><strong>Predictive Capabilities:</strong> AI can anticipate potential attack vectors based on historical data and current trends.</li>
            <li><strong>Adaptive Learning:</strong> Systems can evolve and improve their detection capabilities over time.</li>
          </ul>
          
          <h3>Building an AI-Powered Security Lab</h3>
          <p>Setting up a modern security testing environment requires careful consideration of both hardware and software components. Here's what you need:</p>
          
          <h4>Hardware Requirements</h4>
          <ul>
            <li>High-performance GPU for machine learning workloads</li>
            <li>Sufficient RAM (32GB minimum for serious ML work)</li>
            <li>Fast SSD storage for large datasets</li>
            <li>Dedicated network interfaces for isolated testing</li>
          </ul>
          
          <h4>Software Stack</h4>
          <ul>
            <li>TensorFlow or PyTorch for deep learning</li>
            <li>Scikit-learn for traditional machine learning</li>
            <li>Kali Linux with custom AI security tools</li>
            <li>Docker for containerized environments</li>
          </ul>
          
          <h3>AI-Enhanced Penetration Testing</h3>
          <p>AI can significantly enhance traditional penetration testing methodologies:</p>
          
          <h4>Automated Reconnaissance</h4>
          <p>AI-powered tools can automatically gather and analyze information about target systems, identifying potential entry points and vulnerabilities much faster than manual methods.</p>
          
          <h4>Intelligent Vulnerability Assessment</h4>
          <p>Machine learning algorithms can prioritize vulnerabilities based on exploitability, impact, and environmental factors, helping security teams focus on the most critical issues.</p>
          
          <h4>Dynamic Exploit Generation</h4>
          <p>Advanced AI systems can generate custom exploits based on discovered vulnerabilities, adapting their approach based on target system responses.</p>
          
          <h3>Practical Implementation</h3>
          <p>To implement AI in your security testing workflow, start with these steps:</p>
          
          <ol>
            <li>Collect and curate quality training data from your security operations</li>
            <li>Start with proven ML models for common security tasks</li>
            <li>Gradually integrate AI tools into existing workflows</li>
            <li>Continuously monitor and improve model performance</li>
            <li>Maintain human oversight for critical decisions</li>
          </ol>
          
          <h3>Challenges and Considerations</h3>
          <p>While AI offers significant advantages, there are important challenges to consider:</p>
          
          <ul>
            <li><strong>False Positives:</strong> AI systems may generate false alarms that require human verification</li>
            <li><strong>Adversarial Attacks:</strong> Attackers may try to poison training data or evade AI detection</li>
            <li><strong>Ethical Concerns:</strong> Automated attack tools raise questions about responsible disclosure and testing boundaries</li>
            <li><strong>Skill Requirements:</strong> Teams need both cybersecurity and AI/ML expertise</li>
          </ul>
          
          <h3>Future Directions</h3>
          <p>The future of AI in cybersecurity looks promising, with emerging technologies like:</p>
          
          <ul>
            <li>Federated learning for collaborative threat intelligence</li>
            <li>Quantum-resistant AI algorithms</li>
            <li>Autonomous security response systems</li>
            <li>AI-powered threat hunting platforms</li>
          </ul>
          
          <p>As these technologies mature, we can expect to see even more sophisticated AI-powered security tools that can adapt to new threats in real-time and provide more accurate risk assessments.</p>
          
          <h3>Conclusion</h3>
          <p>AI represents a significant leap forward in cybersecurity capabilities, but it's not a silver bullet. The most effective approach combines AI automation with human expertise, creating a powerful synergy that can tackle the complex security challenges of our digital age.</p>
        `,
        tags: ["AI", "Machine Learning", "Penetration Testing", "Cybersecurity"]
      },
      {
        id: 2,
        title: "Building AI Tools for Digital Defense",
        category: "tools",
        date: "2025-01-10",
        readTime: "12 min",
        excerpt: "Deep dive into creating machine learning-powered security tools that enhance penetration testing and threat detection capabilities.",
        content: `
          <p>Creating effective AI-powered security tools requires a deep understanding of both cybersecurity principles and machine learning techniques. This guide will walk you through the process of building practical AI tools for digital defense.</p>
          
          <h3>Understanding the Security-AI Intersection</h3>
          <p>Before diving into tool development, it's crucial to understand where AI can add the most value in cybersecurity operations:</p>
          
          <ul>
            <li><strong>Anomaly Detection:</strong> Identifying unusual patterns in network traffic or system behavior</li>
            <li><strong>Malware Classification:</strong> Automatically categorizing and analyzing malicious software</li>
            <li><strong>Vulnerability Assessment:</strong> Prioritizing and scoring security vulnerabilities</li>
            <li><strong>Threat Intelligence:</strong> Processing and correlating threat data from multiple sources</li>
          </ul>
          
          <h3>Tool Development Framework</h3>
          <p>A systematic approach to building AI security tools involves several key phases:</p>
          
          <h4>1. Problem Definition</h4>
          <p>Clearly define the security problem you're trying to solve. Consider:</p>
          <ul>
            <li>Current manual processes that could be automated</li>
            <li>Data availability and quality</li>
            <li>Performance requirements and constraints</li>
            <li>Integration with existing security infrastructure</li>
          </ul>
          
          <h4>2. Data Collection and Preprocessing</h4>
          <p>Quality data is the foundation of effective AI tools. Focus on:</p>
          <ul>
            <li>Collecting representative samples of normal and malicious activity</li>
            <li>Ensuring data privacy and compliance requirements</li>
            <li>Implementing proper data cleaning and normalization</li>
            <li>Creating balanced datasets for training</li>
          </ul>
          
          <h4>3. Model Selection and Training</h4>
          <p>Choose appropriate ML algorithms based on your problem type:</p>
          <ul>
            <li><strong>Classification:</strong> Random Forest, SVM, Neural Networks</li>
            <li><strong>Anomaly Detection:</strong> Isolation Forest, One-Class SVM, Autoencoders</li>
            <li><strong>Clustering:</strong> K-means, DBSCAN, Hierarchical clustering</li>
            <li><strong>Time Series:</strong> LSTM, ARIMA, Prophet</li>
          </ul>
          
          <h3>Practical Examples</h3>
          
          <h4>Network Intrusion Detection System</h4>
          <p>Building an AI-powered NIDS involves several components:</p>
          
          <pre><code>import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import numpy as np

class AINetworkMonitor:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def preprocess_traffic(self, network_data):
        # Extract relevant features from network packets
        features = [
            'packet_size', 'protocol', 'src_port', 'dst_port',
            'flags', 'duration', 'bytes_sent', 'bytes_received'
        ]
        return network_data[features]
    
    def train(self, normal_traffic):
        # Train on normal network traffic patterns
        processed_data = self.preprocess_traffic(normal_traffic)
        scaled_data = self.scaler.fit_transform(processed_data)
        self.model.fit(scaled_data)
        self.is_trained = True
    
    def detect_anomalies(self, traffic_data):
        if not self.is_trained:
            raise ValueError("Model must be trained first")
        
        processed_data = self.preprocess_traffic(traffic_data)
        scaled_data = self.scaler.transform(processed_data)
        predictions = self.model.predict(scaled_data)
        
        # Return indices of anomalous traffic
        return np.where(predictions == -1)[0]</code></pre>
          
          <h4>Malware Detection Tool</h4>
          <p>Static analysis combined with machine learning can effectively identify malware:</p>
          
          <pre><code>import hashlib
import pefile
from sklearn.ensemble import RandomForestClassifier
import pickle

class MalwareDetector:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.feature_extractors = {
            'file_size': self._extract_file_size,
            'entropy': self._calculate_entropy,
            'pe_features': self._extract_pe_features,
            'string_features': self._extract_strings
        }
    
    def _extract_file_size(self, file_path):
        import os
        return os.path.getsize(file_path)
    
    def _calculate_entropy(self, file_path):
        with open(file_path, 'rb') as f:
            data = f.read()
        
        # Calculate Shannon entropy
        entropy = 0
        for i in range(256):
            p = data.count(i) / len(data)
            if p > 0:
                entropy -= p * np.log2(p)
        return entropy
    
    def _extract_pe_features(self, file_path):
        try:
            pe = pefile.PE(file_path)
            return {
                'num_sections': len(pe.sections),
                'num_imports': len(pe.DIRECTORY_ENTRY_IMPORT) if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT') else 0,
                'virtual_size': sum(section.Misc_VirtualSize for section in pe.sections)
            }
        except:
            return {'num_sections': 0, 'num_imports': 0, 'virtual_size': 0}
    
    def extract_features(self, file_path):
        features = {}
        for name, extractor in self.feature_extractors.items():
            features.update(extractor(file_path))
        return features
    
    def train(self, file_paths, labels):
        feature_matrix = []
        for file_path in file_paths:
            features = self.extract_features(file_path)
            feature_matrix.append(list(features.values()))
        
        self.model.fit(feature_matrix, labels)
    
    def predict(self, file_path):
        features = self.extract_features(file_path)
        feature_vector = [list(features.values())]
        return self.model.predict(feature_vector)[0]</code></pre>
          
          <h3>Tool Integration and Deployment</h3>
          <p>Successful AI security tools must integrate seamlessly with existing security infrastructure:</p>
          
          <h4>API Development</h4>
          <p>Create RESTful APIs for easy integration:</p>
          
          <pre><code>from flask import Flask, request, jsonify
import json

app = Flask(__name__)
detector = MalwareDetector()

@app.route('/analyze', methods=['POST'])
def analyze_file():
    try:
        file_path = request.json['file_path']
        prediction = detector.predict(file_path)
        confidence = detector.predict_proba(file_path)[0].max()
        
        return jsonify({
            'status': 'success',
            'prediction': 'malware' if prediction == 1 else 'clean',
            'confidence': float(confidence)
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    # Load pre-trained model
    detector.load_model('trained_model.pkl')
    app.run(host='0.0.0.0', port=5000)</code></pre>
          
          <h3>Performance Optimization</h3>
          <p>AI security tools must operate in real-time environments. Key optimization strategies include:</p>
          
          <ul>
            <li><strong>Model Compression:</strong> Use techniques like pruning and quantization to reduce model size</li>
            <li><strong>Caching:</strong> Store frequently accessed results to reduce computation</li>
            <li><strong>Batch Processing:</strong> Process multiple samples simultaneously for efficiency</li>
            <li><strong>Hardware Acceleration:</strong> Leverage GPUs for intensive computations</li>
          </ul>
          
          <h3>Monitoring and Maintenance</h3>
          <p>AI tools require ongoing monitoring and updates:</p>
          
          <ul>
            <li>Track model performance metrics over time</li>
            <li>Implement automated retraining pipelines</li>
            <li>Monitor for concept drift and data quality issues</li>
            <li>Maintain audit logs for compliance and debugging</li>
          </ul>
          
          <h3>Ethical Considerations</h3>
          <p>When developing AI security tools, consider:</p>
          
          <ul>
            <li>Privacy implications of data collection and analysis</li>
            <li>Potential for bias in training data and models</li>
            <li>Responsible disclosure of vulnerabilities discovered by AI</li>
            <li>Transparency in AI decision-making processes</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Building effective AI tools for digital defense requires a combination of security expertise, machine learning knowledge, and engineering skills. By following systematic development practices and considering real-world deployment challenges, you can create tools that significantly enhance your organization's security posture.</p>
        `,
        tags: ["AI Tools", "Machine Learning", "Development", "Security Automation"]
      },
      {
        id: 3,
        title: "My Cybersecurity Journey: From Curiosity to Professional",
        category: "career",
        date: "2024-07-05",
        readTime: "6 min",
        excerpt: "My journey into cybersecurity began with curiosity about system vulnerabilities and evolved into a passion for securing digital environments.",
        content: `
          <p>My journey into cybersecurity began with a simple question: "How do systems really work, and what happens when they break?" This curiosity, sparked during my early college years, would eventually lead me down a path of discovery, learning, and professional growth in the field of cybersecurity.</p>
          
          <h3>The Beginning: First Steps into Security</h3>
          <p>Like many in the cybersecurity field, my interest started with general computing and programming. I was fascinated by how different technologies worked together to create the digital world around us. But it wasn't until I encountered my first security vulnerability that I truly understood the importance of cybersecurity.</p>
          
          <p>During a computer science class, our professor demonstrated a buffer overflow attack. Watching how a few lines of carefully crafted code could completely compromise a system was both terrifying and fascinating. That moment sparked a realization: for every system that exists, there's probably a way to break it, and understanding these weaknesses is crucial for building secure systems.</p>
          
          <h3>Learning the Fundamentals</h3>
          <p>My initial learning was largely self-directed. I spent countless hours reading security blogs, watching conference talks, and experimenting with virtual machines. Some key resources that shaped my early understanding included:</p>
          
          <ul>
            <li><strong>Online Platforms:</strong> TryHackMe and Hack The Box provided hands-on experience in a safe environment</li>
            <li><strong>Books:</strong> "The Web Application Hacker's Handbook" and "Metasploit: The Penetration Tester's Guide" became my early companions</li>
            <li><strong>Communities:</strong> Forums like Reddit's r/netsec and local security meetups connected me with like-minded individuals</li>
            <li><strong>CTF Competitions:</strong> Capture The Flag events challenged me to apply my knowledge in competitive scenarios</li>
          </ul>
          
          <h3>Building Practical Skills</h3>
          <p>Theory is important, but cybersecurity is fundamentally a practical field. I focused on developing hands-on skills through several approaches:</p>
          
          <h4>Home Lab Development</h4>
          <p>I built a comprehensive home lab using VirtualBox and VMware, creating networks of vulnerable machines to practice on. This included:</p>
          <ul>
            <li>Vulnerable VMs like Metasploitable and DVWA</li>
            <li>Network segmentation to simulate real-world environments</li>
            <li>Monitoring tools to understand attack patterns</li>
            <li>Documentation of all activities for future reference</li>
          </ul>
          
          <h4>Programming for Security</h4>
          <p>I quickly realized that effective cybersecurity professionals need strong programming skills. I focused on languages particularly relevant to security:</p>
          <ul>
            <li><strong>Python:</strong> For automation, scripting, and tool development</li>
            <li><strong>C:</strong> To understand low-level vulnerabilities and system internals</li>
            <li><strong>JavaScript:</strong> For web application security testing</li>
            <li><strong>Bash:</strong> For system administration and automation on Linux systems</li>
          </ul>
          
          <h3>Professional Development</h3>
          <p>As my skills grew, I began seeking opportunities to apply them professionally. This involved several key steps:</p>
          
          <h4>Certification Journey</h4>
          <p>While not required, certifications helped validate my knowledge and provided structured learning paths:</p>
          <ul>
            <li>Started with CompTIA Security+ for foundational knowledge</li>
            <li>Pursued CEH (Certified Ethical Hacker) for penetration testing basics</li>
            <li>Currently working toward OSCP (Offensive Security Certified Professional)</li>
          </ul>
          
          <h4>Contributing to Open Source</h4>
          <p>I began contributing to open-source security projects, which helped me:</p>
          <ul>
            <li>Learn from experienced developers and security researchers</li>
            <li>Build a portfolio of publicly visible work</li>
            <li>Understand how security tools are built and maintained</li>
            <li>Connect with the broader cybersecurity community</li>
          </ul>
          
          <h3>Key Projects and Milestones</h3>
          <p>Several projects marked important milestones in my journey:</p>
          
          <h4>Automated Penetration Testing Tool</h4>
          <p>Developing an AI-powered penetration testing framework taught me:</p>
          <ul>
            <li>How to integrate machine learning with traditional security testing</li>
            <li>The importance of automation in handling large-scale assessments</li>
            <li>Challenges of building user-friendly security tools</li>
          </ul>
          
          <h4>GPU-Accelerated Hash Cracker</h4>
          <p>Creating a high-performance hash cracking tool provided insights into:</p>
          <ul>
            <li>Low-level programming and optimization techniques</li>
            <li>The mathematics behind cryptographic algorithms</li>
            <li>Hardware acceleration for security applications</li>
          </ul>
          
          <h3>Challenges and Lessons Learned</h3>
          <p>The path wasn't always smooth. Some key challenges I faced included:</p>
          
          <h4>Information Overload</h4>
          <p>Cybersecurity is a vast field, and it's easy to feel overwhelmed. I learned to:</p>
          <ul>
            <li>Focus on fundamentals before diving into specialized areas</li>
            <li>Choose depth over breadth in key areas of interest</li>
            <li>Set realistic learning goals and track progress</li>
          </ul>
          
          <h4>Ethical Considerations</h4>
          <p>With great power comes great responsibility. Learning about vulnerabilities and attack techniques requires careful consideration of:</p>
          <ul>
            <li>Legal boundaries and proper authorization</li>
            <li>Responsible disclosure of discovered vulnerabilities</li>
            <li>The potential impact of security research on real systems</li>
          </ul>
          
          <h4>Staying Current</h4>
          <p>Cybersecurity evolves rapidly. Staying current requires:</p>
          <ul>
            <li>Following security researchers and thought leaders</li>
            <li>Reading security advisories and vulnerability reports</li>
            <li>Experimenting with new tools and techniques</li>
            <li>Attending conferences and workshops when possible</li>
          </ul>
          
          <h3>Current Focus and Future Goals</h3>
          <p>Today, I focus on several key areas:</p>
          
          <ul>
            <li><strong>AI-Enhanced Security:</strong> Exploring how machine learning can improve security operations</li>
            <li><strong>Tool Development:</strong> Creating practical tools that solve real security problems</li>
            <li><strong>Knowledge Sharing:</strong> Contributing to the community through blog posts, tutorials, and open-source projects</li>
            <li><strong>Continuous Learning:</strong> Staying current with emerging threats and defense techniques</li>
          </ul>
          
          <h3>Advice for Aspiring Cybersecurity Professionals</h3>
          <p>Based on my journey, here's my advice for those starting in cybersecurity:</p>
          
          <ol>
            <li><strong>Start with the Basics:</strong> Build a strong foundation in networking, operating systems, and programming</li>
            <li><strong>Practice Ethically:</strong> Always use your skills responsibly and within legal boundaries</li>
            <li><strong>Build a Lab:</strong> Hands-on experience is invaluable; create a safe environment to experiment</li>
            <li><strong>Join the Community:</strong> Connect with other professionals through forums, meetups, and conferences</li>
            <li><strong>Stay Curious:</strong> The field evolves rapidly; maintain a mindset of continuous learning</li>
            <li><strong>Document Everything:</strong> Keep detailed notes of your learning and experiments</li>
            <li><strong>Focus on Problem-Solving:</strong> Cybersecurity is ultimately about solving complex problems</li>
          </ol>
          
          <h3>Conclusion</h3>
          <p>My cybersecurity journey has been challenging, rewarding, and continuously evolving. What started as curiosity about how systems work has become a passion for protecting the digital infrastructure that our world depends on. The field offers endless opportunities for learning, growth, and making a real impact on digital security.</p>
          
          <p>Every day brings new challenges and opportunities to learn something new. Whether it's understanding a new attack vector, developing a security tool, or helping organizations improve their security posture, the work remains as engaging and important as ever.</p>
          
          <p>For those considering a career in cybersecurity, I encourage you to take the first step. Start with curiosity, build your skills methodically, and remember that every expert was once a beginner. The cybersecurity community is generally welcoming and supportive of newcomers who demonstrate genuine interest and ethical behavior.</p>
        `,
        tags: ["Career", "Learning", "Cybersecurity Journey", "Professional Development"]
      }
    ];
  }

  renderBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';
    
    posts.forEach(post => {
      const blogElement = this.createBlogPostElement(post);
      blogContainer.appendChild(blogElement);
    });
  }

  createBlogPostElement(post) {
    const template = document.getElementById('blog-post-template');
    if (!template) return document.createElement('div');

    const blogElement = template.content.cloneNode(true);
    
    // Populate blog post data
    blogElement.querySelector('.blog-category').textContent = post.category.toUpperCase();
    blogElement.querySelector('.blog-date').textContent = this.formatDate(post.date);
    blogElement.querySelector('.blog-title').textContent = post.title;
    blogElement.querySelector('.read-time-value').textContent = post.readTime;
    blogElement.querySelector('.blog-excerpt').textContent = post.excerpt;
    blogElement.querySelector('.blog-full-content').innerHTML = post.content;

    // Set data attributes
    const article = blogElement.querySelector('.blog-post');
    article.setAttribute('data-category', post.category);
    article.setAttribute('data-id', post.id);

    return blogElement;
  }

  filterBlogPosts(category) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
      const postCategory = post.getAttribute('data-category');
      const shouldShow = category === 'all' || postCategory === category;
      
      if (shouldShow) {
        post.style.display = 'block';
        post.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        post.style.display = 'none';
      }
    });
  }

  searchBlogPosts(query) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
      const title = post.querySelector('.blog-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
      const content = post.querySelector('.blog-full-content').textContent.toLowerCase();
      
      const searchText = `${title} ${excerpt} ${content}`;
      const shouldShow = query === '' || searchText.includes(query.toLowerCase());
      
      if (shouldShow) {
        post.style.display = 'block';
        post.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        post.style.display = 'none';
      }
    });
  }

  expandBlogPost(button) {
    const blogPost = button.closest('.blog-post');
    const excerpt = blogPost.querySelector('.blog-excerpt');
    const fullContent = blogPost.querySelector('.blog-full-content');
    const readMore = blogPost.querySelector('.read-more');
    const readLess = blogPost.querySelector('.read-less');

    excerpt.style.display = 'none';
    fullContent.style.display = 'block';
    readMore.style.display = 'none';
    readLess.style.display = 'inline-flex';

    // Smooth scroll to expanded content
    blogPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  collapseBlogPost(button) {
    const blogPost = button.closest('.blog-post');
    const excerpt = blogPost.querySelector('.blog-excerpt');
    const fullContent = blogPost.querySelector('.blog-full-content');
    const readMore = blogPost.querySelector('.read-more');
    const readLess = blogPost.querySelector('.read-less');

    excerpt.style.display = 'block';
    fullContent.style.display = 'none';
    readMore.style.display = 'inline-flex';
    readLess.style.display = 'none';

    // Smooth scroll to collapsed content
    blogPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  shareBlogPost(button) {
    const blogPost = button.closest('.blog-post');
    const title = blogPost.querySelector('.blog-title').textContent;
    const url = window.location.href;

    if (button.title.includes('Twitter')) {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    } else if (button.title.includes('LinkedIn')) {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      window.open(linkedinUrl, '_blank');
    } else if (button.title.includes('Copy')) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('Link copied to clipboard!');
      });
    }
  }

  loadMoreBlogPosts() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading delay
    setTimeout(() => {
      const remainingPosts = this.allPosts.slice(this.currentPosts.length, this.currentPosts.length + 3);
      
      if (remainingPosts.length > 0) {
        this.currentPosts = [...this.currentPosts, ...remainingPosts];
        this.renderBlogPosts(this.currentPosts);
        
        if (this.currentPosts.length >= this.allPosts.length) {
          loadMoreBtn.style.display = 'none';
        } else {
          loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        }
      }
    }, 1000);
  }

  // Contact form functionality
  handleContactSubmission(form) {
    const formData = new FormData(form);
    const statusDiv = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Validate form
    if (!this.validateForm(form)) {
      this.showFormStatus('Please correct the errors below.', 'error');
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send the data to a server
      console.log('Form data:', Object.fromEntries(formData));
      
      this.showFormStatus(
        'Thank you for your message! I\'ll get back to you within 24 hours.',
        'success'
      );
      
      form.reset();
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
    }, 2000);
  }

  validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
      }
    }

    // Show error if validation failed
    if (!isValid) {
      field.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = errorMessage;
      errorDiv.style.color = 'var(--error-color, #e74c3c)';
      errorDiv.style.fontSize = '0.85rem';
      errorDiv.style.marginTop = '0.25rem';
      field.parentNode.appendChild(errorDiv);
    }

    return isValid;
  }

  showFormStatus(message, type) {
    const statusDiv = document.getElementById('form-status');
    if (!statusDiv) return;

    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  // Modal functionality
  openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Focus trap for accessibility
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }

  closeModal() {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      openModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  // Utility functions
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: 0 4px 12px var(--shadow-medium);
      z-index: var(--z-tooltip);
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }

  updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
    });
  }

  animateSkillBar(skillItem) {
    const skillFill = skillItem.querySelector('.skill-fill');
    if (skillFill) {
      const targetWidth = skillFill.style.width;
      skillFill.style.width = '0%';
      
      setTimeout(() => {
        skillFill.style.width = targetWidth;
      }, 200);
    }
  }

  animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
      }
    }, 16);
  }

  handleScroll() {
    const header = document.querySelector('.main-header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  handleResize() {
    // Handle responsive behavior
    const mobileBreakpoint = 768;
    if (window.innerWidth <= mobileBreakpoint) {
      this.handleMobileResize();
    } else {
      this.handleDesktopResize();
    }
  }

  handleMobileResize() {
    // Mobile-specific adjustments
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  handleDesktopResize() {
    // Desktop-specific adjustments
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cyberPortfolio = new CyberPortfolio();
});

// Add some additional CSS for animations and effects
const additionalStyles = `
  .field-error {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
  
  .form-group input.error,
  .form-group textarea.error,
  .form-group select.error {
    border-color: #e74c3c;
  }
  
  .main-header.scrolled {
    background: rgba(var(--surface-rgb), 0.95);
    backdrop-filter: blur(20px);
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .nav-menu.active {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--surface);
    flex-direction: column;
    padding: var(--space-lg);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 4px 20px var(--shadow-medium);
    z-index: var(--z-dropdown);
  }
  
  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  body.menu-open {
    overflow: hidden;
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
