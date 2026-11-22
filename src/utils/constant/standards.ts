// lib/standards.ts
export const standardsData = [
  { id: 'iso-9001', name: 'ISO 9001', description: 'QMS (Quality)', isNew: false, category: 'Quality Management' },
  { id: 'iso-14001', name: 'ISO 14001', description: 'EMS (Environmental)', isNew: false, category: 'Environmental Management' },
  { id: 'iso-45001', name: 'ISO 45001', description: 'OHSAS (Occupational)', isNew: false, category: 'Occupational Health & Safety' },
  { id: 'iso-22000', name: 'ISO 22000', description: 'FSMS (Food Safety)', isNew: false, category: 'Food Safety Management' },
  { id: 'fssc-22000-v6', name: 'FSSC 22000 V6', description: 'Food Safety', isNew: true, category: 'Food Safety' },
  { id: 'fssc-24000', name: 'FSSC 24000', description: 'Social Accountability', isNew: true, category: 'Social Accountability' },
  { id: 'iso-iec-27001', name: 'ISO/IEC 27001', description: 'ISMS (Information Security)', isNew: false, category: 'Information Security' },
  { id: 'iso-iec-20000-1', name: 'ISO/IEC 20000-1', description: 'ITSMS (IT)', isNew: false, category: 'IT Service Management' },
  { id: 'iso-22301', name: 'ISO 22301', description: 'BCMS (Business Continuity)', isNew: false, category: 'Business Continuity' },
  { id: 'iso-13485', name: 'ISO 13485', description: 'MDQMS (Medical Devices)', isNew: false, category: 'Medical Devices' },
  { id: 'iso-50001', name: 'ISO 50001', description: 'EnMS (Energy)', isNew: false, category: 'Energy Management' },
  { id: 'iso-37001', name: 'ISO 37001', description: 'ABMS (Anti-Bribery)', isNew: false, category: 'Anti-Bribery Management' },
  { id: 'iso-55001', name: 'ISO 55001', description: 'AMS (Asset Management)', isNew: false, category: 'Asset Management' },
  { id: 'iso-20121', name: 'ISO 20121', description: 'ESMS (Event Sustainability)', isNew: false, category: 'Event Sustainability' },
  { id: 'iso-39001', name: 'ISO 39001', description: 'RTSMS (Road Traffic Safety)', isNew: false, category: 'Road Traffic Safety' },
  { id: 'iso-21001', name: 'ISO 21001', description: 'EOMS (Educational)', isNew: false, category: 'Educational Organizations' },
  { id: 'iso-iec-27701', name: 'ISO/IEC 27701', description: 'PIMS (Privacy)', isNew: false, category: 'Privacy Information Management' },
  { id: 'iso-37301', name: 'ISO 37301', description: 'CMS (Compliance)', isNew: false, category: 'Compliance Management' },
  { id: 'iso-42001', name: 'ISO 42001', description: 'AIMS (AI)', isNew: true, category: 'Artificial Intelligence' }
];

export const getStandardById = (id: string) => {
  return standardsData.find(standard => standard.id === id);
};

export const getStandardDetails = (id: string) => {
  const details: Record<string, any> = {
    'iso-9001': {
      fullName: 'ISO 9001:2015 Quality Management Systems',
      overview: 'ISO 9001 is the international standard for Quality Management Systems (QMS). It helps organizations demonstrate their ability to consistently provide products and services that meet customer and regulatory requirements. This standard is based on several quality management principles including a strong customer focus, the involvement of top management, and a process approach to continuous improvement.',
      benefits: [
        'Improved customer satisfaction and loyalty',
        'Enhanced operational efficiency and productivity',
        'Better risk management and decision making',
        'Increased market opportunities and competitive advantage',
        'Continuous improvement culture throughout the organization',
        'Reduced costs through waste minimization',
        'Improved supplier relationships and supply chain management'
      ],
      requirements: [
        'Quality policy and measurable objectives',
        'Documented information management system',
        'Process approach implementation with clear procedures',
        'Risk-based thinking in all operations',
        'Performance evaluation through audits and reviews',
        'Continuous improvement initiatives',
        'Resource management including competence and awareness'
      ],
      industries: ['Manufacturing', 'Healthcare', 'Technology', 'Education', 'Government', 'Construction', 'Service Industries']
    },
    'iso-14001': {
      fullName: 'ISO 14001:2015 Environmental Management Systems',
      overview: 'ISO 14001 provides a framework for organizations to manage their environmental responsibilities effectively. It helps reduce environmental impact, comply with regulations, and improve sustainability performance. This standard enables organizations to achieve environmental excellence while maintaining economic viability.',
      benefits: [
        'Reduced environmental impact and carbon footprint',
        'Regulatory compliance and legal certainty',
        'Cost savings through energy and resource efficiency',
        'Enhanced reputation and stakeholder confidence',
        'Sustainable operations and long-term viability',
        'Improved waste management and pollution prevention'
      ],
      requirements: [
        'Environmental policy and strategic commitment',
        'Planning and risk assessment of environmental aspects',
        'Implementation and operation of controls',
        'Performance evaluation and monitoring',
        'Continuous improvement of environmental performance',
        'Emergency preparedness and response procedures'
      ],
      industries: ['Manufacturing', 'Energy', 'Construction', 'Transportation', 'Agriculture', 'Waste Management', 'Mining']
    },
    'iso-45001': {
      fullName: 'ISO 45001:2018 Occupational Health and Safety Management Systems',
      overview: 'ISO 45001 provides a framework for managing occupational health and safety risks. It helps organizations prevent work-related injuries, illnesses, and create safer working environments. This standard is designed to protect workers and improve workplace safety culture.',
      benefits: [
        'Reduced workplace incidents and injuries',
        'Improved employee safety and well-being',
        'Legal compliance and reduced liability',
        'Enhanced employee morale and retention',
        'Reduced insurance costs and compensation claims',
        'Better risk management and hazard identification',
        'Positive workplace culture and employee engagement'
      ],
      requirements: [
        'Health and safety policy with clear objectives',
        'Hazard identification and comprehensive risk assessment',
        'Emergency preparedness and response planning',
        'Incident investigation and corrective actions',
        'Performance monitoring and health surveillance',
        'Worker participation and consultation',
        'Leadership commitment and accountability'
      ],
      industries: ['Construction', 'Manufacturing', 'Mining', 'Oil & Gas', 'Healthcare', 'Logistics', 'Agriculture']
    },
    'iso-22000': {
      fullName: 'ISO 22000:2018 Food Safety Management Systems',
      overview: 'ISO 22000 is a global standard for Food Safety Management Systems (FSMS). It combines the principles of HACCP (Hazard Analysis and Critical Control Points) with ISO management system requirements. This standard ensures food safety throughout the entire food supply chain.',
      benefits: [
        'Enhanced food safety and quality assurance',
        'Regulatory compliance and market access',
        'Improved consumer confidence and brand reputation',
        'Reduced food safety risks and contamination',
        'Efficient supply chain management',
        'Cost reduction through waste minimization'
      ],
      requirements: [
        'Food safety policy and objectives',
        'Hazard analysis and risk assessment',
        'Prerequisite programs and operational controls',
        'Traceability and recall procedures',
        'Monitoring and verification activities',
        'Continuous improvement of food safety',
        'Food safety culture and training'
      ],
      industries: ['Food Processing', 'Agriculture', 'Catering', 'Food Manufacturing', 'Retail', 'Distribution', 'Hospitality']
    },
    'fssc-22000-v6': {
      fullName: 'FSSC 22000 Version 6 (Food Safety System Certification)',
      overview: 'FSSC 22000 V6 is the latest version of the Food Safety System Certification scheme. It builds on ISO 22000 with additional requirements for food safety management. This certification demonstrates a commitment to food safety excellence and global best practices.',
      benefits: [
        'Global recognition and market acceptance',
        'Comprehensive food safety management',
        'Enhanced consumer and stakeholder trust',
        'Regulatory compliance across multiple markets',
        'Continuous improvement of food safety processes',
        'Competitive advantage in the food industry'
      ],
      requirements: [
        'Food safety management system alignment',
        'Prerequisite programs implementation',
        'Traceability system and recall procedures',
        'Crisis management and business continuity',
        'Food safety culture assessment',
        'Performance monitoring and analysis'
      ],
      industries: ['Food Processing', 'Food Manufacturing', 'Packaging', 'Agriculture', 'Supply Chain', 'Storage & Distribution']
    },
    'fssc-24000': {
      fullName: 'FSSC 24000 Social Accountability Management',
      overview: 'FSSC 24000 is a certification scheme for Social Accountability Management Systems. It helps organizations demonstrate their commitment to ethical business practices, social responsibility, and stakeholder engagement throughout their operations and supply chains.',
      benefits: [
        'Demonstrated social responsibility and ethical practices',
        'Enhanced stakeholder trust and brand reputation',
        'Improved working conditions and labor practices',
        'Sustainable supply chain management',
        'Regulatory compliance and risk reduction',
        'Access to socially responsible markets'
      ],
      requirements: [
        'Social accountability policy and objectives',
        'Labor practices and human rights compliance',
        'Health and safety in the workplace',
        'Environmental sustainability and ethics',
        'Stakeholder engagement and communication',
        'Performance monitoring and improvement'
      ],
      industries: ['Food Processing', 'Consumer Goods', 'Manufacturing', 'Retail', 'Healthcare', 'Education']
    },
    'iso-iec-27001': {
      fullName: 'ISO/IEC 27001:2022 Information Security Management Systems',
      overview: 'ISO/IEC 27001 is the international standard for Information Security Management Systems (ISMS). It provides a systematic approach to managing sensitive company information and ensuring data security. This standard helps organizations protect their information assets and maintain confidentiality, integrity, and availability.',
      benefits: [
        'Enhanced information security and data protection',
        'Regulatory compliance and risk reduction',
        'Customer trust and competitive advantage',
        'Protection of intellectual property and assets',
        'Improved business continuity and resilience',
        'Incident response and recovery capabilities'
      ],
      requirements: [
        'Information security policy and objectives',
        'Risk assessment and treatment plan',
        'Security controls implementation',
        'Monitoring and measurement of security',
        'Incident management and response',
        'Business continuity management',
        'Security awareness and training'
      ],
      industries: ['Technology', 'Finance', 'Healthcare', 'Government', 'Banking', 'Insurance', 'Education', 'Cloud Services']
    },
    'iso-iec-20000-1': {
      fullName: 'ISO/IEC 20000-1:2018 IT Service Management Systems',
      overview: 'ISO/IEC 20000-1 is the international standard for IT Service Management (ITSM). It provides a framework for organizations to deliver effective and efficient IT services. This standard helps improve service quality, reduce costs, and enhance customer satisfaction.',
      benefits: [
        'Improved IT service quality and reliability',
        'Reduced service delivery costs',
        'Enhanced customer satisfaction and trust',
        'Better alignment of IT with business objectives',
        'Streamlined IT operations and processes',
        'Improved incident and problem resolution'
      ],
      requirements: [
        'Service management policy and objectives',
        'Service delivery planning and design',
        'Service operation and support processes',
        'Incident and problem management',
        'Change and configuration management',
        'Service continuity and availability'
      ],
      industries: ['Technology', 'Financial Services', 'Telecommunications', 'Government', 'Healthcare', 'Education']
    },
    'iso-22301': {
      fullName: 'ISO 22301:2019 Business Continuity Management Systems',
      overview: 'ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It provides a framework for organizations to prepare for, respond to, and recover from disruptive incidents. This standard ensures business resilience and continuity of operations.',
      benefits: [
        'Enhanced organizational resilience and agility',
        'Reduced impact of disruptions and crises',
        'Protection of reputation and stakeholder trust',
        'Regulatory compliance and risk management',
        'Quick recovery from incidents and disasters',
        'Competitive advantage through resilience'
      ],
      requirements: [
        'Business continuity policy and objectives',
        'Business impact analysis and risk assessment',
        'Continuity strategies and recovery plans',
        'Incident response and crisis management',
        'Testing and exercising of plans',
        'Continuous improvement and monitoring'
      ],
      industries: ['Finance', 'Healthcare', 'Manufacturing', 'Technology', 'Government', 'Telecommunications']
    },
    'iso-13485': {
      fullName: 'ISO 13485:2016 Medical Devices Quality Management Systems',
      overview: 'ISO 13485 is the international standard for Medical Device Quality Management Systems. It specifies requirements for organizations that design, manufacture, and distribute medical devices. This standard ensures the safety and effectiveness of medical products.',
      benefits: [
        'Ensured product safety and quality',
        'Regulatory compliance and market access',
        'Risk management for patient safety',
        'Customer confidence and trust',
        'Operational efficiency and control',
        'Global market acceptance'
      ],
      requirements: [
        'Quality management system documentation',
        'Design and development controls',
        'Risk management throughout product lifecycle',
        'Production and process controls',
        'Supplier management and oversight',
        'Complaint handling and reporting',
        'Regulatory compliance and validation'
      ],
      industries: ['Medical Devices', 'Healthcare', 'Pharmaceuticals', 'Biotechnology', 'Laboratories', 'Research']
    },
    'iso-50001': {
      fullName: 'ISO 50001:2018 Energy Management Systems',
      overview: 'ISO 50001 is the international standard for Energy Management Systems (EnMS). It provides a framework for organizations to improve energy performance, reduce energy consumption, and lower carbon emissions. This standard supports sustainable energy management practices.',
      benefits: [
        'Reduced energy consumption and costs',
        'Lower carbon footprint and emissions',
        'Regulatory compliance and sustainability',
        'Enhanced reputation and environmental responsibility',
        'Improved operational efficiency',
        'Energy performance improvement culture'
      ],
      requirements: [
        'Energy policy and objectives',
        'Energy planning and assessment',
        'Energy performance indicators',
        'Implementation of energy management',
        'Monitoring and measurement of energy use',
        'Continuous improvement of energy performance'
      ],
      industries: ['Manufacturing', 'Buildings', 'Transportation', 'Healthcare', 'Education', 'Industrial Facilities']
    },
    'iso-37001': {
      fullName: 'ISO 37001:2016 Anti-Bribery Management Systems',
      overview: 'ISO 37001 is the international standard for Anti-Bribery Management Systems (ABMS). It provides a framework for organizations to prevent, detect, and respond to bribery and corruption. This standard helps organizations promote ethical business practices and integrity.',
      benefits: [
        'Demonstrated commitment to ethical business',
        'Reduced risk of bribery and corruption',
        'Enhanced stakeholder trust and reputation',
        'Legal and regulatory compliance',
        'Competitive advantage in ethical markets',
        'Transparent and accountable operations'
      ],
      requirements: [
        'Anti-bribery policy and commitment',
        'Risk assessment and due diligence',
        'Implementation of anti-bribery controls',
        'Training and awareness programs',
        'Monitoring and review processes',
        'Reporting and investigation procedures'
      ],
      industries: ['Finance', 'Government', 'Construction', 'Healthcare', 'Real Estate', 'Transportation']
    },
    'iso-55001': {
      fullName: 'ISO 55001:2014 Asset Management Systems',
      overview: 'ISO 55001 is the international standard for Asset Management Systems (AMS). It provides a framework for organizations to manage their assets effectively throughout their lifecycle. This standard helps organizations achieve optimal return on assets and sustainable operations.',
      benefits: [
        'Optimized asset performance and ROI',
        'Reduced lifecycle costs',
        'Improved risk management and compliance',
        'Enhanced operational efficiency',
        'Sustainable asset management practices',
        'Better decision-making for investments'
      ],
      requirements: [
        'Asset management policy and strategy',
        'Asset lifecycle planning and management',
        'Risk assessment and mitigation',
        'Performance monitoring and measurement',
        'Continuous improvement of asset management',
        'Resource allocation and optimization'
      ],
      industries: ['Infrastructure', 'Manufacturing', 'Energy', 'Construction', 'Transportation', 'Utilities']
    },
    'iso-20121': {
      fullName: 'ISO 20121:2012 Event Sustainability Management Systems',
      overview: 'ISO 20121 is the international standard for Event Sustainability Management Systems (ESMS). It provides a framework for organizations to manage sustainable events effectively. This standard helps event organizers minimize environmental impact and maximize social benefits.',
      benefits: [
        'Reduced environmental impact of events',
        'Enhanced social responsibility and ethics',
        'Cost savings through sustainable practices',
        'Improved stakeholder engagement and reputation',
        'Legacy and long-term community benefits',
        'Sustainability innovation and leadership'
      ],
      requirements: [
        'Sustainability policy and objectives',
        'Issue identification and stakeholder engagement',
        'Sustainability planning and implementation',
        'Performance monitoring and measurement',
        'Communication and reporting',
        'Continuous improvement and review'
      ],
      industries: ['Events Management', 'Sports', 'Conferences', 'Festivals', 'Corporate Events', 'Exhibitions']
    },
    'iso-39001': {
      fullName: 'ISO 39001:2012 Road Traffic Safety Management Systems',
      overview: 'ISO 39001 is the international standard for Road Traffic Safety Management Systems (RTSMS). It provides a framework for organizations to manage and reduce road traffic risks. This standard helps organizations protect life and property through safer road transportation.',
      benefits: [
        'Reduced road traffic accidents and fatalities',
        'Enhanced road safety culture',
        'Regulatory compliance and risk reduction',
        'Lower insurance costs and liabilities',
        'Improved organizational reputation',
        'Protection of stakeholders and community'
      ],
      requirements: [
        'Road traffic safety policy and objectives',
        'Risk assessment and crash analysis',
        'Safety performance indicators',
        'Implementation of safety measures',
        'Monitoring and evaluation of safety',
        'Continuous improvement and compliance'
      ],
      industries: ['Transportation', 'Logistics', 'Fleet Management', 'Government', 'Public Safety', 'Emergency Services']
    },
    'iso-21001': {
      fullName: 'ISO 21001:2018 Educational Organizations Management Systems',
      overview: 'ISO 21001 is the international standard for Educational Organizations Management Systems (EOMS). It provides a framework for educational institutions to improve their quality and effectiveness. This standard helps organizations deliver better learning outcomes and educational experiences.',
      benefits: [
        'Improved learning outcomes and student success',
        'Enhanced educational quality and standards',
        'Stakeholder satisfaction and engagement',
        'Operational efficiency and effectiveness',
        'Compliance with educational regulations',
        'Competitive advantage in education sector'
      ],
      requirements: [
        'Educational policy and objectives',
        'Curriculum design and development',
        'Student assessment and progression',
        'Teacher and staff competence',
        'Resource management and facilities',
        'Continuous improvement and evaluation'
      ],
      industries: ['Schools', 'Colleges', 'Universities', 'Training Centers', 'Online Education', 'Vocational Training']
    },
    'iso-iec-27701': {
      fullName: 'ISO/IEC 27701:2019 Privacy Information Management Systems',
      overview: 'ISO/IEC 27701 is the international standard for Privacy Information Management Systems (PIMS). It extends ISO/IEC 27001 to include requirements for privacy management. This standard helps organizations protect personal data and comply with privacy regulations.',
      benefits: [
        'Enhanced data privacy and protection',
        'Regulatory compliance with privacy laws',
        'Customer trust and confidence',
        'Reduced data breach risks',
        'Improved incident response capabilities',
        'Competitive advantage in privacy management'
      ],
      requirements: [
        'Privacy policy and objectives',
        'Data protection and privacy controls',
        'Privacy risk assessment and management',
        'Subject rights and consent management',
        'Data breach response and notification',
        'Privacy monitoring and compliance'
      ],
      industries: ['Technology', 'Healthcare', 'Finance', 'Government', 'Retail', 'Cloud Services']
    },
    'iso-37301': {
      fullName: 'ISO 37301:2021 Compliance Management Systems',
      overview: 'ISO 37301 is the international standard for Compliance Management Systems (CMS). It provides a framework for organizations to establish, implement, and maintain effective compliance programs. This standard helps organizations meet legal and regulatory obligations.',
      benefits: [
        'Demonstrated commitment to compliance',
        'Reduced risk of legal and regulatory violations',
        'Enhanced stakeholder trust and reputation',
        'Ethical business culture and integrity',
        'Continuous monitoring and improvement of compliance',
        'Compliance leadership and governance'
      ],
      requirements: [
        'Compliance policy and commitment',
        'Risk assessment and due diligence',
        'Compliance controls and procedures',
        'Training and awareness programs',
        'Monitoring and reporting systems',
        'Continuous improvement and management review'
      ],
      industries: ['Finance', 'Healthcare', 'Government', 'Technology', 'Construction', 'Energy']
    },
    'iso-42001': {
      fullName: 'ISO 42001:2023 Artificial Intelligence Management Systems',
      overview: 'ISO 42001 is the latest international standard for Artificial Intelligence Management Systems (AIMS). It provides a framework for organizations to manage AI responsibly and ethically. This standard helps organizations ensure the safety, reliability, and trustworthiness of AI systems.',
      benefits: [
        'Responsible and ethical AI development',
        'Enhanced AI safety and reliability',
        'Regulatory compliance and market access',
        'Stakeholder trust and confidence',
        'AI risk management and mitigation',
        'Innovation and competitive advantage'
      ],
      requirements: [
        'AI policy and governance framework',
        'AI risk assessment and management',
        'AI system development and deployment',
        'Data quality and management',
        'Monitoring and auditing of AI systems',
        'Transparency and explainability',
        'Ethical guidelines and compliance'
      ],
      industries: ['Technology', 'Finance', 'Healthcare', 'Automotive', 'Manufacturing', 'Government', 'Research']
    }
  };

  // Default details for any missing standards
  const defaultDetails = {
    fullName: `${standardsData.find(s => s.id === id)?.name || 'Standard'} - Comprehensive Framework`,
    overview: `The ${standardsData.find(s => s.id === id)?.name || 'standard'} provides comprehensive guidelines for ${standardsData.find(s => s.id === id)?.description?.toLowerCase() || 'quality management'} in organizations worldwide. It helps organizations achieve excellence, ensure compliance, and maintain high standards of performance and quality.`,
    benefits: [
      'Enhanced organizational performance and efficiency',
      'Improved stakeholder confidence and satisfaction',
      'Regulatory compliance and risk management',
      'Operational excellence and continuous improvement',
      'Risk mitigation and strategic decision-making',
      'Sustainable growth and competitive advantage'
    ],
    requirements: [
      'Management system framework and policies',
      'Documentation and records management',
      'Implementation procedures and controls',
      'Monitoring and measurement systems',
      'Review and improvement processes',
      'Continual improvement and innovation'
    ],
    industries: ['Various Industries', 'Public Sector', 'Private Sector', 'Non-Profit Organizations', 'Government Agencies']
  };

  return details[id] || defaultDetails;
};



