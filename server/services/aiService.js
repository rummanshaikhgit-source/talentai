const { OpenAI } = require('openai');

class AIService {
    constructor() {
        // Initialize OpenAI with API key from environment
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    // 1. Generate Professional Summary
    async generateSummary(profile) {
        try {
            console.log('🤖 AI: Generating professional summary...');
            
            const personalInfo = profile.personalInfo || {};
            const skills = profile.skills || [];
            const experience = profile.experience || [];
            const projects = profile.projects || [];
            
            // Format skills for prompt
            const skillsText = skills.length > 0 
                ? skills.map(s => typeof s === 'object' ? s.name : s).slice(0, 10).join(', ')
                : 'various technical skills';
            
            // Format experience for prompt
            const experienceText = experience.length > 0
                ? experience.map(e => `${e.role} at ${e.company}`).slice(0, 3).join(', ')
                : 'relevant experience';
            
            // Format projects for prompt
            const projectsText = projects.length > 0
                ? projects.map(p => p.title).slice(0, 3).join(', ')
                : 'personal projects';
            
            const prompt = `Create a compelling professional summary for this candidate:

Name: ${personalInfo.fullName || 'The candidate'}
Title: ${personalInfo.headline || 'Professional'}
Experience Level: ${personalInfo.experienceLevel || 'Experienced'}
Location: ${personalInfo.location || 'Not specified'}
Key Skills: ${skillsText}
Experience: ${experienceText}
Projects: ${projectsText}

Write a concise, impactful summary (80-120 words) that:
- Highlights their expertise and key strengths
- Mentions specific achievements
- Shows their value proposition
- Is ready for a resume or LinkedIn profile
- Uses professional, confident tone

Summary:`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert resume writer and career coach. Create professional, compelling summaries that help candidates stand out.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 250
            });

            const summary = response.choices[0].message.content.trim();
            console.log('✅ AI Summary generated successfully');
            return summary;

        } catch (error) {
            console.error('❌ AI Summary Generation Error:', error.message);
            // Return a fallback summary if API fails
            return `${profile.personalInfo?.fullName || 'This candidate'} is a ${profile.personalInfo?.experienceLevel || 'skilled'} professional based in ${profile.personalInfo?.location || 'their location'}. Experienced in ${(profile.skills || []).slice(0, 3).map(s => typeof s === 'object' ? s.name : s).join(', ') || 'various technologies'}. Proven track record of delivering high-quality results and driving business value. Ready to bring expertise to a dynamic organization.`;
        }
    }

    // 2. Generate Project Description
    async generateProjectDescription(title, techStack, userInput) {
        try {
            console.log('🤖 AI: Generating project description...');
            
            const prompt = `Create a professional project description for:

Project Title: ${title}
Technologies Used: ${techStack}
Project Context: ${userInput || 'No additional context provided'}

Write a compelling description that includes:
1. The problem this project solves
2. Your approach and implementation
3. Key features and functionality
4. Measurable results/impact (use numbers if possible)
5. Technologies used

Make it sound impressive and ready for a portfolio or resume.
Use bullet points for achievements and keep it professional.`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a technical writer specializing in project documentation. Create impressive, detailed project descriptions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 400
            });

            const description = response.choices[0].message.content.trim();
            console.log('✅ AI Project Description generated successfully');
            return description;

        } catch (error) {
            console.error('❌ AI Project Description Error:', error.message);
            // Fallback description
            return `${title} is a project built with ${techStack}. This project demonstrates expertise in modern web development, including responsive design, API integration, and best practices. Key features include user authentication, real-time updates, and optimized performance. The project showcases problem-solving skills and attention to detail.`;
        }
    }

    // 3. Suggest Skills
    async suggestSkills(experience, projects, currentSkills = []) {
        try {
            console.log('🤖 AI: Generating skill suggestions...');
            
            const experienceText = experience.length > 0
                ? experience.map(e => `${e.role} at ${e.company}: ${e.description?.substring(0, 100) || ''}`).join('\n')
                : 'No experience provided';
            
            const projectsText = projects.length > 0
                ? projects.map(p => `${p.title}: ${p.description?.substring(0, 100) || ''}`).join('\n')
                : 'No projects provided';
            
            const currentSkillsText = currentSkills.length > 0
                ? currentSkills.map(s => typeof s === 'object' ? s.name : s).join(', ')
                : 'none';
            
            const prompt = `Based on the following experience and projects, suggest 5-7 relevant skills that would enhance this profile:

EXPERIENCE:
${experienceText}

PROJECTS:
${projectsText}

CURRENT SKILLS:
${currentSkillsText}

Return ONLY the skill names, one per line, no numbers or bullet points.
Suggest skills that are:
- Relevant to their experience and projects
- In high demand in the industry
- Complementary to their existing skills
- Specific and actionable

Skills:`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a career advisor specializing in skill development. Suggest relevant, in-demand skills.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.6,
                max_tokens: 150
            });

            const suggestions = response.choices[0].message.content
                .split('\n')
                .filter(s => s.trim())
                .map(s => s.replace(/^\d+\.\s*/, '').trim())
                .slice(0, 6);
            
            console.log('✅ AI Skill Suggestions generated:', suggestions);
            return suggestions;

        } catch (error) {
            console.error('❌ AI Skill Suggestions Error:', error.message);
            // Fallback suggestions
            return ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB'];
        }
    }

    // 4. Enhance Existing Description
    async enhanceDescription(originalDescription, context = '') {
        try {
            console.log('🤖 AI: Enhancing description...');
            
            const prompt = `Enhance this professional description to make it more impactful:

ORIGINAL DESCRIPTION:
${originalDescription}

CONTEXT: ${context}

Requirements:
- Add quantifiable achievements (use %, numbers, time saved)
- Include specific technologies and tools
- Highlight leadership or collaboration aspects
- Make it more compelling for recruiters
- Keep professional tone
- Add bullet points for key achievements

Enhanced Description:`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert at writing impactful professional descriptions. Add metrics, achievements, and make descriptions shine.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 350
            });

            const enhanced = response.choices[0].message.content.trim();
            console.log('✅ AI Description Enhanced successfully');
            return enhanced;

        } catch (error) {
            console.error('❌ AI Enhance Description Error:', error.message);
            // Fallback enhanced version
            return `✨ ${originalDescription}\n\nKey Achievements:\n• Delivered high-impact results through innovative solutions\n• Optimized processes resulting in improved efficiency\n• Collaborated with cross-functional teams for successful delivery\n• Implemented best practices and modern technologies`;
        }
    }
}

module.exports = new AIService();