import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { APP_BUTTON_TEXT, APP_DESCRIPTION, APP_ICON_URL, APP_NAME, APP_OG_IMAGE_URL, APP_PRIMARY_CATEGORY, APP_SPLASH_BACKGROUND_COLOR, APP_TAGS, APP_URL, } from './constants';
import { APP_SPLASH_URL } from './constants';

interface MiniAppMetadata {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl?: string;
  buttonTitle?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  webhookUrl?: string;
  description?: string;
  primaryCategory?: string;
  tags?: string[];
  requiredChains?:string[]; 
};

interface MiniAppManifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: MiniAppMetadata;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSecretEnvVars() {
  const seedPhrase = process.env.SEED_PHRASE as string;
  const fid = process.env.FID;
  
  if (!seedPhrase || !fid) {
    return null;
  }

  return { seedPhrase, fid };
}

export function getMiniAppEmbedMetadata(ogImageUrl?: string) {
  return {
    version: "next",
    imageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    button: {
      title: APP_BUTTON_TEXT,
      action: {
        type: "launch_frame",
        name: APP_NAME,
        url: APP_URL,
        splashImageUrl: APP_SPLASH_URL,
        iconUrl: APP_ICON_URL,
        splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
        description: APP_DESCRIPTION,
        primaryCategory: APP_PRIMARY_CATEGORY,
        tags: APP_TAGS,
      },
    },
  };
}

export async function getMiniAppMetadata(): Promise<MiniAppManifest> {
  // First check for MINI_APP_METADATA in .env and use that if it exists
  if (process.env.MINI_APP_METADATA) {
    try {
      const metadata = JSON.parse(process.env.MINI_APP_METADATA);
      console.log('Using pre-signed mini app metadata from environment');
      return metadata;
    } catch (error) {
      console.warn('Failed to parse MINI_APP_METADATA from environment:', error);
    }
  }

  if (!APP_URL) {
    throw new Error('NEXT_PUBLIC_URL not configured');
  }

  // Get the domain from the URL (without https:// prefix)
  // const domain = new URL(APP_URL).hostname;

  const secretEnvVars = getSecretEnvVars();
  if (!secretEnvVars) {
    console.warn('No seed phrase or FID found in environment variables -- generating unsigned metadata');
  }
  return {
    accountAssociation:  {
      header: "eyJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4M0EwMTA5MDVEY0Q3MkY0YTc4YTc3ZjU2MzYwMTc4MEFGQWU1NjUyRiIsImZpZCI6OTQwOTI5fQ==",
      payload:"eyJkb21haW4iOiJyYW5kb2JldC1yZS52ZXJjZWwuYXBwIn0",
      signature:"MHhiZDExNTUxNmE0MzM2YzMyNGI1MzA2YjU2ZTU4YjM0ZWE5ZGUyODk0Mzg5YjQ3MmNiMWMwMzc3MzY2MTg1YTI1NjAxOTk0YTI2ZTk4YTIxYTZjZDUzZjgwN2JiYjcwMjVhYWM4NTQ4OWI0NDEzYTZkYWI4MGQ5OTk4OGM4NTMxODFj"
    },
    frame: {
      version:"1",
      name:"Randobet",
      iconUrl:"https://randobet-re.vercel.app/logo.png",
      homeUrl:"https://randobet-re.vercel.app",
      imageUrl:"https://randobet-re.vercel.app/api/opengraph-image",
      buttonTitle:"open",
      splashImageUrl:"https://randobet-re.vercel.app/splash-screen.png",
      splashBackgroundColor:"#fff",
      webhookUrl:"https://api.neynar.com/f/app/98274362-f69a-41fa-a581-ffabf5423b50/event",
      description:"An innovative betting platform that leverages user curiosity to create a unique betting experience.",
      primaryCategory:"gaming",
      tags:["gaming","betting","crypto","blockchain","fun"],
      requiredChains: [
        'eip155:42220'
      ]
    },
  };
}
