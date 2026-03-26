const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class PDFService {
    static async generateResume(profile, user) {
        let browser = null;
        try {
            const templatePath = path.join(__dirname, '../templates/resume-template.html');
            let templateHtml = await fs.readFile(templatePath, 'utf-8');
            
            handlebars.registerHelper('formatDate', function(date) {
                if (!date) return '';
                return date;
            });
            
            handlebars.registerHelper('join', function(arr, separator) {
                if (!arr || !Array.isArray(arr)) return '';
                return arr.join(separator);
            });
            
            const data = {
                profile: profile.toObject(),
                user: {
                    name: user.name,
                    email: user.email
                },
                generatedDate: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
            
            const template = handlebars.compile(templateHtml);
            const html = template(data);
            
            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: true
            });
            const page = await browser.newPage();
            
            await page.setContent(html, {
                waitUntil: 'networkidle0'
            });
            
            const pdf = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '15mm',
                    bottom: '20mm',
                    left: '15mm'
                }
            });
            
            return pdf;
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = PDFService;