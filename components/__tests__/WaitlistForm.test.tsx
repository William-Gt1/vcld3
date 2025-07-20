import { render, screen, waitFor, mockFormData } from '@/tests/utils';
import { WaitlistForm } from '../WaitlistForm';

describe('WaitlistForm', () => {
  it('renders form fields correctly', () => {
    render(<WaitlistForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/subscribe to course updates/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const { user } = render(<WaitlistForm />);

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for error messages
    expect(await screen.findByText(/name.*required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email.*required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const { user } = render(<WaitlistForm />);

    // Enter invalid email
    await user.type(
      screen.getByLabelText(/email address/i),
      mockFormData.invalidData.email
    );

    // Try to submit
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for error message
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('handles successful submission', async () => {
    const { user } = render(<WaitlistForm />);

    // Fill form with valid data
    await user.type(
      screen.getByLabelText(/full name/i),
      mockFormData.validSubmission.name
    );
    await user.type(
      screen.getByLabelText(/email address/i),
      mockFormData.validSubmission.email
    );

    // Submit form
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for success message
    expect(
      await screen.findByText(/successfully joined/i)
    ).toBeInTheDocument();
  });

  it('handles duplicate email error', async () => {
    const { user } = render(<WaitlistForm />);

    // Fill form with duplicate email
    await user.type(
      screen.getByLabelText(/full name/i),
      mockFormData.duplicateEmail.name
    );
    await user.type(
      screen.getByLabelText(/email address/i),
      mockFormData.duplicateEmail.email
    );

    // Submit form
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for error message
    expect(
      await screen.findByText(/already on the waitlist/i)
    ).toBeInTheDocument();
  });

  it('handles rate limit error', async () => {
    const { user } = render(<WaitlistForm />);

    // Fill form with rate limited email
    await user.type(
      screen.getByLabelText(/full name/i),
      mockFormData.rateLimited.name
    );
    await user.type(
      screen.getByLabelText(/email address/i),
      mockFormData.rateLimited.email
    );

    // Submit form
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for error message
    expect(await screen.findByText(/too many requests/i)).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    const { user } = render(<WaitlistForm />);

    // Fill form with valid data
    await user.type(
      screen.getByLabelText(/full name/i),
      mockFormData.validSubmission.name
    );
    await user.type(
      screen.getByLabelText(/email address/i),
      mockFormData.validSubmission.email
    );

    // Start submission
    await user.click(screen.getByRole('button', { name: /join/i }));

    // Check for loading state
    expect(screen.getByText(/joining waitlist/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.queryByText(/joining waitlist/i)).not.toBeInTheDocument();
    });
  });
}); 