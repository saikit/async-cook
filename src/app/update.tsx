import { Input } from "../components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Form } from "react-router";
import type { Route } from "./+types/update";
import { getItem } from "../utils/sessionStorage";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`${API_URL}/recipes/${params.slug}`);
  const recipe = await res.json();
  return recipe;
}

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getItem("token")}`,
    },
  });

  if (!res.ok) {
    return { success: false, message: "Failed to update project." };
  }

  return { success: true };
}

function UpdateRecipe ({ loaderData }: Route.ComponentProps) {
    const { title, id, intro, reference, slug, published} = loaderData.data;
    const [isPublished, setIsPublished] = useState(published);
    return (
        <>
        <h1 className="text-2xl text-center font-bold mb-4">Update Recipe Page</h1>
        <Form method="put">
          <FieldGroup>
            <Input type="hidden" value={id} name="id"/>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" value={title}/>
            </Field>
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <Input name="slug" value={slug}/>
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea name="intro">{intro}</Textarea>
            </Field>
            <Field>
              <FieldLabel>Reference</FieldLabel>
              <Textarea name="reference">{reference}</Textarea>
            </Field>
            <Field orientation="horizontal">
              <Input id="published" type="checkbox" name="published" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
              <Label htmlFor="published">Published</Label>
            </Field>
            <Field><Button type="submit">Update</Button> <Link to={`/manage`}><Button variant="outline">Return to Admin</Button></Link></Field>
          </FieldGroup>
        </Form>
        </>
    )
}

export default UpdateRecipe
