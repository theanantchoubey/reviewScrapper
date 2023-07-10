// material-ui
import { Typography, Paper } from '@mui/material';

// project imports

// ==============================|| GUIDE PAGE ||============================== //
const GuidePage = () => (
    <Paper sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ pb: 2 }}>
            How to Use?
        </Typography>
        <Typography variant="h3">Analyse Review</Typography>
        Use links in below given format --:
        <ol>
            <li>The link must be Amazon link - "https://www.amazon.in/"</li>
            <li>Afterwards of it, the link must be targetting some Amazon product.</li>
            <li>Example of one of such Link - "https://www.amazon.in/dp/B09G9QFDVK/"</li>
            <p style={{ color: 'orange' }}>Please Note: That minimum this much of data in link should be provided.</p>
        </ol>
        <Typography variant="h3">Compare Products</Typography>
        Use links in below given format --:
        <ol>
            <li>If you are choosing Amazon products then both link must be in format - "https://www.amazon.in/"</li>
            <li>If you are choosing Flipkart products then both link must be in format - "https://www.flipkart.com/"</li>
            <li>Afterwards of it, the link must be targetting some Actual products of these websites.</li>
            <li>Example of Amazon Link - "https://www.amazon.in/dp/B09G9QFDVK/"</li>
            <li>Example of Flipkart Link - "https://www.flipkart.com/apple-iphone-14-starlight-128-gb/p/itm3485a56f6e676"</li>
            <p style={{ color: 'orange' }}>Please Note: That minimum, this much of data in link should be provided.</p>
        </ol>
        <Typography variant="h3">Compare Amazon & Flipkart</Typography>
        Use links in below given format --:
        <ol>
            <li>In first input, link must be in format (For Amazon) - "https://www.amazon.in/"</li>
            <li>In second input, link must be in format (For Flipkart) - "https://www.flipkart.com/"</li>
            <li>Afterwards of it, the link must be targetting some Actual products of these websites.</li>
            <li>Example of Amazon Link - "https://www.amazon.in/dp/B09G9QFDVK/"</li>
            <li>Example of Flipkart Link - "https://www.flipkart.com/apple-iphone-14-starlight-128-gb/p/itm3485a56f6e676"</li>
            <p style={{ color: 'orange' }}>Please Note: That minimum, this much of data in link should be provided.</p>
        </ol>
    </Paper>
);

export default GuidePage;
