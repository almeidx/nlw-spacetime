"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, type ChangeEvent } from "react";

const enum MediaType {
	Image = "img",
	Video = "video",
}

export function MediaPicker() {
	const [preview, setPreview] = useState<string | null>(null);
	const [type, setType] = useState<MediaType>(MediaType.Image);

	function onMediaChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}

		const previewUrl = URL.createObjectURL(file);

		setPreview(previewUrl);
		setType(file.type.startsWith("video") ? MediaType.Video : MediaType.Image);
	}

	const Type = type;

	return (
		<>
			<input
				accept="image/*,video/*"
				className="sr-only"
				id="media"
				name="coverUrl"
				onChange={onMediaChange}
				required
				type="file"
			/>

			{preview && <Type className="aspect-video w-full rounded-lg object-cover" controls src={preview} />}
		</>
	);
}
