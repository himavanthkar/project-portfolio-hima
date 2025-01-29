import React from 'react';
import { Download } from 'lucide-react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Himavanth Karpurapu</Text>
        <Text style={styles.subheading}>Master's Student in Computer Science</Text>
        <Text style={styles.text}>San Jose State University</Text>
      </View>
      {/* Add more sections for experience, education, etc. */}
    </Page>
  </Document>
);

export const ResumeDownload: React.FC = () => {
  const resumeData = {
    name: "Himavanth Karpurapu",
    contact: {
      location: "San Jose, CA, USA",
      phone: "+1 (408) 210 9874",
      email: "himavanth.karpurapu@sjsu.edu",
      linkedin: "www.linkedin.com/in/himavanth-karpurapu-6907561b3",
      github: "https://github.com/himavanthkar",
      portfolio: "https://himavanthkarpurapu.com"
    },
    education: [
      {
        school: "San Jose State University",
        location: "San Jose, CA, USA",
        degree: "Master of Science in Computer Science",
        period: "Aug 2024 – May 2026",
        gpa: "3.8",
        courses: "Advanced Machine Learning, Distributed Systems, Cloud Computing"
      },
      {
        school: "Jawaharlal Nehru Technological University",
        location: "Hyd, India",
        degree: "Bachelor of Technology in CSE",
        period: "Aug 2019 – Aug 2023",
        gpa: "3.7"
      }
    ],
    skills: {
      languages: ["Python", "JavaScript", "Java", "C++", "Go", "C#"],
      frameworks: ["React.js", "Flask", "FastAPI", ".NET"],
      ml: ["CNNs", "GANs", "Hugging Face Transformers", "PyTorch", "TensorFlow"],
      cloud: ["Azure", "AWS", "Terraform", "Docker", "Kubernetes"],
      cicd: ["Jenkins", "GitHub Actions", "Azure DevOps"],
      data: ["Kafka", "Spark", "Power BI", "Tableau", "Prometheus", "Grafana"],
      databases: ["RDS", "MongoDB", "Firebase", "Azure SQL", "Redis"],
      tools: ["Visual Studio", "Microsoft Teams", "GitLab", "GitHub", "OpenCV"]
    }
  };

  const handleDownload = () => {
    // Update this path to match your PDF file name in the public folder
    window.open('/resume.pdf', '_blank');
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Resume
    </button>
  );
};