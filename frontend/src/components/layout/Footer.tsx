export function Footer() {
    return (
      <footer className="border-t py-12 bg-background mt-auto">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
                    <div>
                        <h3 className="font-bold mb-4">NexEvent</h3>
                        <p className="text-sm">Empowering campus events seamlessly.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Features</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold mb-4">Resources</h3>
                         <ul className="space-y-2 text-sm">
                            <li>Documentation</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                         <ul className="space-y-2 text-sm">
                            <li>Privacy</li>
                            <li>Terms</li>
                        </ul>
                    </div>
                </div>
              <p className="text-sm border-t pt-8">&copy; {new Date().getFullYear()} NexEvent. All rights reserved.</p>
          </div>
      </footer>
    )
  }
