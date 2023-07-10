// material-ui
import { Typography, Link } from '@mui/material';
import { Email, GitHub, LinkedIn, YouTube } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| ABOUT PAGE ||============================== //
const heading = () => {
    return (
        <>
            About Review Scrapper
            <br />
            <div style={{ marginTop: '6px' }}>
                <Link
                    color="#fff"
                    sx={{ ':hover': { color: 'yellow' }, pr: 3 }}
                    href="https://github.com/theanantchoubey/productScrapping"
                    target="_blank"
                >
                    <GitHub />
                </Link>
                <Link
                    color="#fff"
                    sx={{ ':hover': { color: 'yellow' } }}
                    href="https://www.youtube.com/playlist?list=PLPqS130a8EQ_qwvgiWoCuW7tQf55HRQX0"
                    target="_blank"
                >
                    <YouTube />
                </Link>
            </div>
        </>
    );
};
const AboutPage = () => (
    <MainCard title={heading()}>
        <div>
            This is a Full Stack project developed by Anant Choubey. It is developed using the following stacks --:
            <ol>
                <li>React JS</li>
                <li>Express JS</li>
                <li>Node JS</li>
                <li>Database - MongoDB</li>
                <li>Framework - Material UI</li>
                <li>NPM Packages - Cheerio, Chalk, etc.</li>
            </ol>
        </div>
        <div>
            Following are the features of this project --:
            <ol>
                <li>Get Analysis of all the reviews of Amazon Products</li>
                <li>Compare two Amazon Products on the basis of price, reviews, discount, etc.</li>
                <li>Compare Amazon and Flipkart products</li>
            </ol>
        </div>
        <Typography variant="h4" gutterBottom>
            About Developer
        </Typography>
        <div>
            Hello! I am Anant Choubey, a Full Stack Developer who develops websites using MERN Stack Framework. Following are link to my
            profiles --:
            <p>
                <Link
                    color="#fff"
                    sx={{ ':hover': { color: 'yellow' }, pr: 2 }}
                    href="https://www.linkedin.com/in/theanantchoubey/"
                    target="_blank"
                >
                    <LinkedIn />
                </Link>

                <Link color="#fff" sx={{ ':hover': { color: 'yellow' }, pr: 2 }} href="https://github.com/theanantchoubey/" target="_blank">
                    <GitHub />
                </Link>

                <Link color="#fff" sx={{ ':hover': { color: 'yellow' }, pr: 2 }} href="mailto:anantchoubey039@gmail.com" target="_blank">
                    <Email />
                </Link>
                <Link
                    color="#fff"
                    sx={{ ':hover': { color: 'yellow' }, pr: 2 }}
                    href="https://www.youtube.com/@theanantchoubey"
                    target="_blank"
                >
                    <YouTube />
                </Link>
            </p>
        </div>
    </MainCard>
);

export default AboutPage;
