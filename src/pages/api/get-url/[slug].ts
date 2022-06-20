/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.statusCode = 404;

		res.json({ message: "Use with slug"});
		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			}
		}
	})

	if (!data) {
		res.statusCode = 404;

		res.json({ message: "Not found"});
		return;
	}

	res.json(data);
};