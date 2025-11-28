import { auth, signOut } from "../auth"

export default async function Home() {
  const session = await auth()

  return (
    <main style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#333',
      lineHeight: '1.6'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        padding: '1rem 0',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>SM</h2>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#about" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>About</a>
            <a href="#projects" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Projects</a>
            <a href="#skills" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Skills</a>
            <a href="#contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact</a>

            {!session ? (
              <a
                href="/login"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#667eea',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: '600',
                  transition: 'background-color 0.2s'
                }}
              >
                Login
              </a>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <a
                  href="/projects"
                  style={{
                    textDecoration: 'none',
                    color: '#667eea',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}
                >
                  Dashboard
                </a>
                <form
                  action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }}
                  style={{ margin: 0 }}
                >
                  <button
                    type="submit"
                    style={{
                      padding: '0.5rem 1.5rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Sayantan Mishra
          </h1>
          <p style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: '300',
            marginBottom: '2rem',
            opacity: '0.95'
          }}>
            Senior Full-Stack Engineer — Building AI-Powered Products
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8',
            opacity: '0.9'
          }}>
            5.6 years building scalable, production-grade systems serving 100K+ users.
            Specializing in AI implementation—LLM integration, RAG systems, and AI-powered applications.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'transform 0.2s'
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                border: '2px solid white'
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '6rem 2rem',
        backgroundColor: '#ffffff',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          About Me
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>Background</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Senior Software Engineer with expertise in Node.js, TypeScript, Python, and AWS cloud infrastructure.
              Strong foundation in system architecture, database optimization, and serverless technologies.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>Current Focus</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Currently specializing in AI implementation—LLM integration, RAG systems, and AI-powered applications.
              Proven ability to bridge ML models and production deployment for real-world business impact.
            </p>
          </div>
        </div>
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          maxWidth: '900px',
          margin: '4rem auto 0'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Achievements & Recognition</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>🏆 Gem of the Month (2025)</strong> — Won company hackathon for AI-powered feature at Recrosoft
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>🏆 Titan of the Quarter (2023)</strong> — Successfully migrated platform to v2 architecture at Onmobile
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>🥈 2nd Place</strong> — Intra-College Coding Contest, DSCSDEC (2019)
            </li>
          </ul>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '6rem 2rem',
        backgroundColor: '#f8f9fa',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Featured Projects
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '4rem',
            maxWidth: '700px',
            margin: '0 auto 4rem'
          }}>
            A collection of my work spanning AI integration, scalable backend systems, and full-stack applications
          </p>

          {/* Projects Grid - Empty for now, ready to add projects */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}>
            {/* Project cards will be added here */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '2px dashed #ddd',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#999'
            }}>
              <p style={{ fontSize: '1.1rem' }}>Projects coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{
        padding: '6rem 2rem',
        backgroundColor: '#ffffff',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Technical Skills
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <SkillCard
              title="Languages & Frameworks"
              skills={['Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Express.js', 'Spring Boot', 'React.js', 'Redux']}
            />
            <SkillCard
              title="AI/ML Stack"
              skills={['LangChain', 'OpenAI API', 'Anthropic Claude API', 'RAG Systems', 'Prompt Engineering', 'Vector Databases (Pinecone, Chroma)']}
            />
            <SkillCard
              title="Databases"
              skills={['MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis (Hashes, Sorted Sets, Lua)']}
            />
            <SkillCard
              title="Cloud & Infrastructure"
              skills={['AWS (Lambda, ECS, EC2, S3, RDS)', 'API Gateway', 'EventBridge', 'SQS, SNS, SES', 'CloudWatch', 'Azure VMs']}
            />
            <SkillCard
              title="DevOps & Tools"
              skills={['Terraform', 'Terragrunt', 'Serverless Framework', 'Docker', 'Git', 'CI/CD pipelines']}
            />
            <SkillCard
              title="APIs & Integration"
              skills={['REST APIs', 'GraphQL (Apollo, GraphQL Yoga)', 'WebSockets', 'Socket.io']}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Let's Connect
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: '0.9'
          }}>
            I'm always open to discussing new opportunities, collaborations, or just having a chat about tech!
          </p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <ContactLink href="mailto:sayanmdn@gmail.com" icon="✉️" text="sayanmdn@gmail.com" />
            <ContactLink href="tel:+917001137041" icon="📱" text="+91 7001137041" />
          </div>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            marginTop: '3rem'
          }}>
            <SocialLink href="https://linkedin.com/in/sayantan-mishra" text="LinkedIn" />
            <SocialLink href="https://github.com/sayanmdn" text="GitHub" />
            <SocialLink href="https://sayantanmishra.com" text="Website" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, opacity: '0.7' }}>
          © 2025 Sayantan Mishra. Built with Next.js.
        </p>
      </footer>
    </main>
  )
}

// Helper Components
function SkillCard({ title, skills }) {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        color: '#667eea'
      }}>
        {title}
      </h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        {skills.map((skill, index) => (
          <li key={index} style={{
            padding: '0.5rem 0',
            borderBottom: index < skills.length - 1 ? '1px solid #e9ecef' : 'none',
            fontSize: '0.95rem',
            color: '#555'
          }}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactLink({ href, icon, text }) {
  return (
    <a href={href} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '8px',
      transition: 'background-color 0.2s'
    }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      {text}
    </a>
  )
}

function SocialLink({ href, text }) {
  return (
    <a href={href} style={{
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      padding: '0.75rem 1.5rem',
      border: '2px solid white',
      borderRadius: '8px',
      transition: 'all 0.2s'
    }}>
      {text}
    </a>
  )
}
