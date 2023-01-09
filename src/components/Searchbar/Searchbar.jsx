import { Search, Form, FormSubmit, Label, Input } from 'components/Searchbar/Searchbar.styled'

export const Searchbar = () => (
    <Search>
        <Form>
            <FormSubmit type="submit">
                <Label>Search</Label>
            </FormSubmit>

            <Input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </Form>
    </Search>
  );