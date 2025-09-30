/* eslint-disable */ 
import { NextResponse } from 'next/server';
import { getMiniAppMetadata } from '@/lib/farc-utils';

export async function GET() {
  try {
    const config = await getMiniAppMetadata();
    return NextResponse.json(config);
  } catch (error: any) {
    console.error('Error generating metadata:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
